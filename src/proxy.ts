import { chain, withAuth, withLogging } from "@/middleware";

/**
 * Next.js 16 request proxy (formerly "middleware" — renamed in v16).
 *
 * This is the single entry point Next.js runs before requests complete.
 * Pipeline logic lives in composable modules under `src/middleware/`;
 * register additional modules in the chain below.
 */
export const proxy = chain([withLogging, withAuth]);

export const config = {
  // Run on application routes only — skip static assets and metadata files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
