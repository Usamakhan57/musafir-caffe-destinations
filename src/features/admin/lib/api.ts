import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import type { UserRole } from "@/features/auth/types";

import { canEditContent, canManageUsers, canModerate, isStaffRole } from "../lib/validation";

export async function requireStaff() {
  const session = await auth();
  if (!session?.user || !isStaffRole(session.user.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

export function forbidUnless(
  role: UserRole | string | undefined,
  allowed: "users" | "content" | "moderate" | "staff",
) {
  if (allowed === "staff" && !isStaffRole(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (allowed === "users" && !canManageUsers(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (allowed === "content" && !canEditContent(role) && !canManageUsers(role)) {
    // moderators can read; editors/admins write — write checks happen in handlers
    if (!isStaffRole(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }
  if (allowed === "moderate" && !canModerate(role) && !canManageUsers(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}
