import { z } from "zod";

import {
  dbCreateUser,
  dbDeleteUsers,
  dbListUsers,
  dbUpdateUser,
} from "@/features/admin/data/cms-db";
import {
  forbidUnless,
  jsonError,
  jsonOk,
  requireStaff,
} from "@/features/admin/lib/api";
import {
  bulkActionSchema,
  canManageUsers,
  paginationSchema,
  userInputSchema,
} from "@/features/admin/lib/validation";

export async function GET(request: Request) {
  const { error } = await requireStaff();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const parsed = paginationSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) return jsonError("Invalid query", 400, parsed.error.flatten());

  const { page, pageSize, q, role } = parsed.data;
  try {
    return jsonOk(await dbListUsers(page, pageSize, q, role));
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Database unavailable", 503);
  }
}

export async function POST(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const denied = forbidUnless(session!.user.role, "users");
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const bulk = bulkActionSchema.safeParse(body);
  if (bulk.success && bulk.data.action === "delete") {
    // Prevent self-deletion privilege issues
    if (bulk.data.ids.includes(session!.user.id)) {
      return jsonError("Cannot delete your own account", 400);
    }
    try {
      await dbDeleteUsers(bulk.data.ids);
      return jsonOk({ ok: true });
    } catch (err) {
      return jsonError(err instanceof Error ? err.message : "Delete failed", 503);
    }
  }

  const parsed = userInputSchema.safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());

  // Only admins reach here; still block non-admin role escalation by editors if gate regresses
  if (!canManageUsers(session!.user.role)) {
    return jsonError("Forbidden", 403);
  }

  try {
    const created = await dbCreateUser(parsed.data);
    return jsonOk(created, 201);
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Create failed", 400);
  }
}

export async function PATCH(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const denied = forbidUnless(session!.user.role, "users");
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const envelope = z
    .object({ id: z.string().min(1), patch: z.record(z.string(), z.unknown()) })
    .safeParse(body);
  if (!envelope.success) return jsonError("Validation failed", 400, envelope.error.flatten());

  try {
    const updated = await dbUpdateUser(envelope.data.id, envelope.data.patch);
    if (!updated) return jsonError("Not found", 404);
    return jsonOk(updated);
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Update failed", 400);
  }
}

export async function DELETE(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const denied = forbidUnless(session!.user.role, "users");
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const parsed = z.object({ ids: z.array(z.string()).min(1) }).safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
  if (parsed.data.ids.includes(session!.user.id)) {
    return jsonError("Cannot delete your own account", 400);
  }

  try {
    await dbDeleteUsers(parsed.data.ids);
    return jsonOk({ ok: true });
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Delete failed", 503);
  }
}
