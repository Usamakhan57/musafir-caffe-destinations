import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type { ProxyHandler } from "./chain";

/**
 * Protected routes configuration.
 * Routes listed here require authentication.
 * Role-based routes require the user to have the specified role.
 */
/** Auth-gated app surfaces only — public marketing pages stay open. */
const PROTECTED_ROUTES = ["/profile", "/dashboard"] as const;
const ROLE_PROTECTED_ROUTES = {
  admin: ["/admin"],
} as const;

const STAFF_ROLES = new Set(["admin", "editor", "moderator"]);
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"] as const;

function getSessionToken(request: NextRequest): string | undefined {
  return (
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value
  );
}

/**
 * Auth middleware module for the proxy chain.
 *
 * - Redirects unauthenticated users away from protected routes.
 * - Redirects authenticated users away from auth pages (login/register).
 * - Blocks non-admin users from admin routes.
 *
 * Note: This checks for the presence of a session cookie as a fast guard.
 * Full session validation happens server-side in route handlers / pages.
 */
export const withAuth: ProxyHandler = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = getSessionToken(request);
  const isAuthenticated = Boolean(token);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAdminRoute = ROLE_PROTECTED_ROUTES.admin.some((route) => pathname.startsWith(route));
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && isAuthenticated) {
    const role = request.cookies.get("authjs.role")?.value;
    if (!role || !STAFF_ROLES.has(role)) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return undefined;
};
