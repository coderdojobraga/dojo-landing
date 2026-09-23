import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getSiteSettings } from "@/lib/settings";
import ToggleRow from "./ToggleRow";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Backoffice | CoderDojo Braga",
  description: "Painel de controlo de navegação do CoderDojo Braga.",
};

export default async function BackofficePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(sessionToken)) {
    redirect("/backoffice/login");
  }

  const settings = getSiteSettings();

  return (
    <div className="min-h-[70vh] py-12">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Backoffice
          </h1>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 hover:text-primary"
            >
              <span>Ver Site</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Plain list */}
        <div className="mt-4 divide-y divide-gray-100">
          {settings.navItems.map((item) => (
            <ToggleRow
              key={item.id}
              item={item}
              curriculumDestination={settings.curriculumDestination}
              notionUrl={settings.notionCurriculumUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
