import { z } from "zod";

import { cmsStore } from "@/features/admin/data/cms-store";
import {
  forbidUnless,
  jsonError,
  jsonOk,
  requireStaff,
} from "@/features/admin/lib/api";
import {
  bulkActionSchema,
  canEditContent,
  canManageUsers,
  canModerate,
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
  return jsonOk(cmsStore.listUsers(page, pageSize, q, role));
}

export async function POST(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const denied = forbidUnless(session!.user.role, "users");
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const bulk = bulkActionSchema.safeParse(body);
  if (bulk.success && bulk.data.action === "delete") {
    cmsStore.deleteUsers(bulk.data.ids);
    return jsonOk({ ok: true });
  }

  const parsed = userInputSchema.safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());

  const created = cmsStore.createUser({
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role,
    emailVerified: parsed.data.emailVerified,
    image: parsed.data.image,
  });
  return jsonOk(created, 201);
}

export async function PATCH(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  if (!canManageUsers(session!.user.role)) {
    return jsonError("Forbidden", 403);
  }

  const body = await request.json().catch(() => null);
  const schema = z.object({
    id: z.string().min(1),
    patch: userInputSchema.partial(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());

  const updated = cmsStore.updateUser(parsed.data.id, parsed.data.patch);
  if (!updated) return jsonError("Not found", 404);
  return jsonOk(updated);
}

export async function DELETE(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  if (!canManageUsers(session!.user.role) && !canModerate(session!.user.role) && !canEditContent(session!.user.role)) {
    return jsonError("Forbidden", 403);
  }
  if (!canManageUsers(session!.user.role)) return jsonError("Forbidden", 403);

  const body = await request.json().catch(() => null);
  const parsed = z.object({ ids: z.array(z.string()).min(1) }).safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
  cmsStore.deleteUsers(parsed.data.ids);
  return jsonOk({ ok: true });
}
