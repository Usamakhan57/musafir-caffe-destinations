import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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
 * - Blocks non-staff users from admin routes using the JWT role claim
 *   (not a fragile secondary cookie).
 */
export const withAuth: ProxyHandler = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const tokenCookie = getSessionToken(request);
  const isAuthenticated = Boolean(tokenCookie);

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
  if (isAdminRoute) {
    const jwt = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET ?? "development-secret",
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!jwt) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = typeof jwt.role === "string" ? jwt.role : "";
    if (!STAFF_ROLES.has(role)) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return undefined;
};
