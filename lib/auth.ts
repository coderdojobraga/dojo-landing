import crypto from "crypto";

export const SESSION_COOKIE_NAME = "dojo_admin_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitRecord {
  count: number;
  lockedUntil: number | null;
  firstAttemptTime: number;
}

// In-memory rate limiting store
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Periodically purge stale records (older than 1 hour)
 */
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      rateLimitMap.delete(ip);
    } else if (now - record.firstAttemptTime > 60 * 60 * 1000) {
      rateLimitMap.delete(ip);
    }
  }
}

/**
 * Check if the given IP address is currently rate-limited.
 */
export function checkRateLimit(ip: string): { allowed: boolean; remainingLockoutSeconds?: number } {
  cleanupRateLimits();
  const record = rateLimitMap.get(ip);
  if (!record) {
    return { allowed: true };
  }

  const now = Date.now();
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockoutSeconds: remainingSeconds };
  }

  return { allowed: true };
}

/**
 * Record a failed login attempt for the given IP address.
 */
export function recordFailedAttempt(ip: string): { isLocked: boolean; remainingLockoutSeconds?: number } {
  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = { count: 1, lockedUntil: null, firstAttemptTime: now };
    rateLimitMap.set(ip, record);
    return { isLocked: false };
  }

  record.count += 1;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    const remainingSeconds = Math.ceil(LOCKOUT_DURATION_MS / 1000);
    return { isLocked: true, remainingLockoutSeconds: remainingSeconds };
  }

  return { isLocked: false };
}

/**
 * Reset failed attempts upon successful authentication.
 */
export function resetFailedAttempts(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Hash a string using SHA-256 to ensure fixed-length comparison buffers.
 */
function sha256(input: string): Buffer {
  return crypto.createHash("sha256").update(input, "utf-8").digest();
}

/**
 * Constant-time comparison between candidate password and the configured secret.
 * Defends against timing attacks.
 */
export function verifyPassword(candidatePassword: string): boolean {
  const adminPassword = process.env.BACKOFFICE_PASSWORD;
  if (!adminPassword || typeof candidatePassword !== "string") {
    return false;
  }

  const candidateHash = sha256(candidatePassword);
  const targetHash = sha256(adminPassword);

  return crypto.timingSafeEqual(candidateHash, targetHash);
}

function getAuthSecret(): string {
  const secret = process.env.BACKOFFICE_SECRET;
  if (!secret) {
    console.warn("WARNING: BACKOFFICE_SECRET is not set! Using fallback secret.");
    return "coderdojo_insecure_fallback_secret_please_set_env";
  }
  return secret;
}

/**
 * Create a cryptographically signed session token.
 * Format: <timestamp>.<nonce>.<hmac-sha256>
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const data = `${timestamp}.${nonce}`;

  const secret = getAuthSecret();
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");

  return `${data}.${signature}`;
}

/**
 * Verify the cryptographic signature and timestamp of a session token.
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [timestampStr, nonce, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const now = Date.now();
  const ageSeconds = (now - timestamp) / 1000;
  if (ageSeconds < -60 || ageSeconds > SESSION_MAX_AGE_SECONDS) {
    // Token is expired or created in the future
    return false;
  }

  const secret = getAuthSecret();
  const data = `${timestampStr}.${nonce}`;
  const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex");

  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

/**
 * Returns cookie options for session management.
 */
export function getSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
