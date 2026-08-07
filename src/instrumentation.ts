/**
 * Next.js instrumentation — runs once when the Node server starts.
 * Ensures AUTH_URL / AUTH_TRUST_HOST for Hostinger proxies and heals bootstrap admin.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;

  if (!process.env.AUTH_URL && process.env.NEXT_PUBLIC_APP_URL) {
    process.env.AUTH_URL = process.env.NEXT_PUBLIC_APP_URL;
  }
  if (!process.env.AUTH_TRUST_HOST) {
    process.env.AUTH_TRUST_HOST = "true";
  }

  if (!process.env.DATABASE_URL) return;

  try {
    const { ensureBootstrapAdmin } = await import("@/features/auth/data/ensure-admin");
    const result = await ensureBootstrapAdmin();
    if (result.ok) {
      console.info(`[bootstrap-admin] ${result.action}`);
    } else {
      console.warn(`[bootstrap-admin] skipped: ${result.reason}`);
    }
  } catch (error) {
    console.warn(
      "[bootstrap-admin] failed:",
      error instanceof Error ? error.message : error,
    );
  }
}
