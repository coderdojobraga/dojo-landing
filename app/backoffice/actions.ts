"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkRateLimit,
  createSessionToken,
  getSessionCookieOptions,
  recordFailedAttempt,
  resetFailedAttempts,
  SESSION_COOKIE_NAME,
  verifyPassword,
  verifySessionToken,
} from "@/lib/auth";
import { updateNavItem, updateCurriculumDestination } from "@/lib/settings";

export interface ActionResponse {
  error?: string;
  success?: boolean;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headerList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Handles administrator login with rate-limiting and constant-time password verification.
 */
export async function loginAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const password = formData.get("password") as string;
  if (!password) {
    return { error: "Por favor insere a palavra-passe." };
  }

  const clientIp = await getClientIp();

  // Check rate limiting
  const rateLimitStatus = checkRateLimit(clientIp);
  if (!rateLimitStatus.allowed) {
    const minutes = Math.ceil((rateLimitStatus.remainingLockoutSeconds || 0) / 60);
    return {
      error: `Demasiadas tentativas falhadas. Bloqueado por mais ${minutes} minuto(s).`,
    };
  }

  // Constant-time check
  const isValid = verifyPassword(password);
  if (!isValid) {
    const failRecord = recordFailedAttempt(clientIp);
    if (failRecord.isLocked) {
      return {
        error: "Demasiadas tentativas incorretas. O teu acesso foi temporariamente bloqueado durante 15 minutos.",
      };
    }
    return { error: "Palavra-passe incorreta." };
  }

  // Success: reset rate limit & issue cookie
  resetFailedAttempts(clientIp);
  const sessionToken = createSessionToken();
  const cookieOptions = getSessionCookieOptions();

  const cookieStore = await cookies();
  cookieStore.set(cookieOptions.name, sessionToken, cookieOptions);

  redirect("/backoffice");
}

/**
 * Handles administrator logout.
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/backoffice/login");
}

/**
 * Toggle a navigation item's visibility and route availability.
 */
export async function toggleNavAction(id: string, enabled: boolean): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(sessionToken)) {
    return { error: "Sessão não autorizada ou expirada." };
  }

  try {
    updateNavItem(id, enabled);
    // Revalidate all pages layout cache so navbar updates instantly
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error toggling navigation item:", error);
    return { error: "Falha ao atualizar a definição." };
  }
}

/**
 * Update curriculum destination ("internal" | "notion").
 */
export async function updateCurriculumDestinationAction(
  destination: "internal" | "notion",
  customUrl?: string
): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(sessionToken)) {
    return { error: "Sessão não autorizada ou expirada." };
  }

  try {
    updateCurriculumDestination(destination, customUrl);
    revalidatePath("/", "layout");
    revalidatePath("/curriculum");
    revalidatePath("/backoffice");
    return { success: true };
  } catch (error) {
    console.error("Error updating curriculum destination:", error);
    return { error: "Falha ao atualizar destino do currículo." };
  }
}

