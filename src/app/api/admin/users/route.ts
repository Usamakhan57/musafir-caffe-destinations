import { z } from "zod";

import { cmsStore } from "@/features/admin/data/cms-store";
import { dbListUsers } from "@/features/admin/data/cms-db";
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
import { isDatabaseReady, prisma } from "@/lib/prisma";

function mapRoleToDb(role: string) {
  if (role === "cafe-owner") return "cafe_owner" as const;
  if (role === "guide-creator") return "guide_creator" as const;
  return role as "traveler" | "admin" | "editor" | "moderator";
}

function mapRoleFromDb(role: string) {
  if (role === "cafe_owner") return "cafe-owner";
  if (role === "guide_creator") return "guide-creator";
  return role;
}

export async function GET(request: Request) {
  const { error } = await requireStaff();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const parsed = paginationSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) return jsonError("Invalid query", 400, parsed.error.flatten());

  const { page, pageSize, q, role } = parsed.data;
  const fromDb = await dbListUsers(page, pageSize, q, role);
  return jsonOk(fromDb ?? cmsStore.listUsers(page, pageSize, q, role));
}

export async function POST(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const denied = forbidUnless(session!.user.role, "users");
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const bulk = bulkActionSchema.safeParse(body);
  if (bulk.success && bulk.data.action === "delete") {
    if (await isDatabaseReady()) {
      await prisma.user.deleteMany({ where: { id: { in: bulk.data.ids } } });
    } else {
      cmsStore.deleteUsers(bulk.data.ids);
    }
    return jsonOk({ ok: true });
  }

  const parsed = userInputSchema.safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());

  if (await isDatabaseReady()) {
    const created = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        role: mapRoleToDb(parsed.data.role),
        emailVerified: parsed.data.emailVerified,
        image: parsed.data.image,
      },
    });
    await prisma.profile.create({
      data: { userId: created.id, displayName: created.name },
    });
    return jsonOk(
      {
        id: created.id,
        name: created.name,
        email: created.email,
        role: mapRoleFromDb(created.role),
        emailVerified: created.emailVerified,
        image: created.image ?? undefined,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      },
      201,
    );
  }

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

  if (await isDatabaseReady()) {
    const updated = await prisma.user.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.patch.name,
        email: parsed.data.patch.email,
        role: parsed.data.patch.role ? mapRoleToDb(parsed.data.patch.role) : undefined,
        emailVerified: parsed.data.patch.emailVerified,
        image: parsed.data.patch.image,
      },
    });
    return jsonOk({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: mapRoleFromDb(updated.role),
      emailVerified: updated.emailVerified,
      image: updated.image ?? undefined,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  }

  const updated = cmsStore.updateUser(parsed.data.id, parsed.data.patch);
  if (!updated) return jsonError("Not found", 404);
  return jsonOk(updated);
}

export async function DELETE(request: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;
  if (
    !canManageUsers(session!.user.role) &&
    !canModerate(session!.user.role) &&
    !canEditContent(session!.user.role)
  ) {
    return jsonError("Forbidden", 403);
  }
  if (!canManageUsers(session!.user.role)) return jsonError("Forbidden", 403);

  const body = await request.json().catch(() => null);
  const parsed = z.object({ ids: z.array(z.string()).min(1) }).safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
  if (await isDatabaseReady()) {
    await prisma.user.deleteMany({ where: { id: { in: parsed.data.ids } } });
  } else {
    cmsStore.deleteUsers(parsed.data.ids);
  }
  return jsonOk({ ok: true });
}
