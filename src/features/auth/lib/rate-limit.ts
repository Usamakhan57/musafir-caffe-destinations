import { headers } from "next/headers";

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();

function getClientIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return headersList.get("x-real-ip") ?? "unknown";
}

export async function checkRateLimit(action: string): Promise<{ ok: boolean; retryAfter?: number }> {
  const headersList = await headers();
  const key = `${action}:${getClientIp(headersList)}`;
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || existing.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  attempts.set(key, { count: existing.count + 1, resetAt: existing.resetAt });
  return { ok: true };
}
