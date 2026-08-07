import { z } from "zod";

import { cmsStore } from "@/features/admin/data/cms-store";
import {
  dbCreateDestination,
  dbDeleteDestinations,
  dbListDestinations,
  dbUpdateDestination,
} from "@/features/admin/data/cms-db";
import { jsonError, jsonOk, requireStaff } from "@/features/admin/lib/api";
import {
  bulkActionSchema,
  cafeInputSchema,
  canEditContent,
  canManageUsers,
  canModerate,
  categoryInputSchema,
  communityInputSchema,
  destinationInputSchema,
  guideInputSchema,
  mediaInputSchema,
  paginationSchema,
  reviewInputSchema,
  tagInputSchema,
} from "@/features/admin/lib/validation";
import type { AdminResource } from "@/features/admin/types";
import { listMediaAssets, listReviews } from "@/server/db";

const RESOURCES = new Set<AdminResource>([
  "destinations",
  "cafes",
  "guides",
  "community",
  "categories",
  "tags",
  "reviews",
  "media",
]);

type RouteContext = { params: Promise<{ resource: string }> };

function assertResource(value: string): AdminResource | null {
  return RESOURCES.has(value as AdminResource) ? (value as AdminResource) : null;
}

function canWrite(resource: AdminResource, role: string | undefined) {
  if (canManageUsers(role)) return true;
  if (resource === "reviews") return canModerate(role);
  if (resource === "media") return canEditContent(role) || canModerate(role);
  if (resource === "categories" || resource === "tags") return canEditContent(role);
  return canEditContent(role);
}

export async function GET(request: Request, context: RouteContext) {
  const { error } = await requireStaff();
  if (error) return error;

  const { resource: raw } = await context.params;
  const resource = assertResource(raw);
  if (!resource) return jsonError("Unknown resource", 404);

  const parsed = paginationSchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams),
  );
  if (!parsed.success) return jsonError("Invalid query", 400, parsed.error.flatten());
  const { page, pageSize, q, status } = parsed.data;

  switch (resource) {
    case "destinations": {
      const fromDb = await dbListDestinations(page, pageSize, q, status);
      return jsonOk(fromDb ?? cmsStore.listDestinations(page, pageSize, q, status));
    }
    case "cafes":
      return jsonOk(cmsStore.listCafes(page, pageSize, q, status));
    case "guides":
      return jsonOk(cmsStore.listGuides(page, pageSize, q, status));
    case "community":
      return jsonOk(cmsStore.listCommunity(page, pageSize, q, status));
    case "categories":
      return jsonOk(cmsStore.listCategories(page, pageSize, q));
    case "tags":
      return jsonOk(cmsStore.listTags(page, pageSize, q));
    case "reviews": {
      const rows = await listReviews({ status });
      if (rows) {
        const filtered = rows.filter((row) =>
          q
            ? `${row.targetName} ${row.authorName} ${row.body}`
                .toLowerCase()
                .includes(q.toLowerCase())
            : true,
        );
        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const start = (page - 1) * pageSize;
        return jsonOk({
          items: filtered.slice(start, start + pageSize).map((row) => ({
            id: row.id,
            targetType: row.targetType,
            targetId: row.targetId,
            targetName: row.targetName,
            rating: row.rating,
            body: row.body,
            status: row.status,
            authorName: row.authorName,
            createdAt: row.createdAt.toISOString(),
            updatedAt: row.updatedAt.toISOString(),
          })),
          page,
          pageSize,
          total,
          totalPages,
        });
      }
      return jsonOk(cmsStore.listReviews(page, pageSize, q, status));
    }
    case "media": {
      const media = await listMediaAssets(q, page, pageSize);
      if (media) {
        return jsonOk({
          ...media,
          items: media.items.map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            alt: item.alt ?? "",
            mimeType: item.mimeType,
            sizeBytes: item.sizeBytes,
            folder: item.folder,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
          })),
        });
      }
      return jsonOk(cmsStore.listMedia(page, pageSize, q));
    }
    default:
      return jsonError("Unknown resource", 404);
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { session, error } = await requireStaff();
  if (error) return error;

  const { resource: raw } = await context.params;
  const resource = assertResource(raw);
  if (!resource) return jsonError("Unknown resource", 404);
  if (!canWrite(resource, session!.user.role)) return jsonError("Forbidden", 403);

  const body = await request.json().catch(() => null);
  const bulk = bulkActionSchema.safeParse(body);
  if (bulk.success) {
    switch (resource) {
      case "destinations":
        cmsStore.bulkDestinations(bulk.data.ids, bulk.data.action);
        break;
      case "cafes":
        cmsStore.bulkCafes(bulk.data.ids, bulk.data.action);
        break;
      case "guides":
        cmsStore.bulkGuides(bulk.data.ids, bulk.data.action);
        break;
      case "community":
        cmsStore.bulkCommunity(bulk.data.ids, bulk.data.action);
        break;
      case "reviews":
        cmsStore.bulkReviews(bulk.data.ids, bulk.data.action);
        break;
      case "categories":
        if (bulk.data.action === "delete") cmsStore.deleteCategories(bulk.data.ids);
        break;
      case "tags":
        if (bulk.data.action === "delete") cmsStore.deleteTags(bulk.data.ids);
        break;
      case "media":
        if (bulk.data.action === "delete") cmsStore.deleteMedia(bulk.data.ids);
        break;
      default:
        break;
    }
    return jsonOk({ ok: true });
  }

  switch (resource) {
    case "destinations": {
      const parsed = destinationInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const input = {
        ...parsed.data,
        categoryId: parsed.data.categoryId ?? null,
        coverImage: parsed.data.coverImage ?? null,
      };
      const created = (await dbCreateDestination(input)) ?? cmsStore.createDestination(input);
      return jsonOk(created, 201);
    }
    case "cafes": {
      const parsed = cafeInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(
        cmsStore.createCafe({
          ...parsed.data,
          categoryId: parsed.data.categoryId ?? null,
          coverImage: parsed.data.coverImage ?? null,
        }),
        201,
      );
    }
    case "guides": {
      const parsed = guideInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(
        cmsStore.createGuide({
          ...parsed.data,
          categoryId: parsed.data.categoryId ?? null,
          coverImage: parsed.data.coverImage ?? null,
        }),
        201,
      );
    }
    case "community": {
      const parsed = communityInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(
        cmsStore.createCommunity({
          ...parsed.data,
          categoryId: parsed.data.categoryId ?? null,
          coverImage: parsed.data.coverImage ?? null,
        }),
        201,
      );
    }
    case "categories": {
      const parsed = categoryInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(cmsStore.createCategory(parsed.data), 201);
    }
    case "tags": {
      const parsed = tagInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(cmsStore.createTag(parsed.data), 201);
    }
    case "reviews": {
      const parsed = reviewInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(cmsStore.createReview(parsed.data), 201);
    }
    case "media": {
      const parsed = mediaInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      return jsonOk(cmsStore.createMedia(parsed.data), 201);
    }
    default:
      return jsonError("Unknown resource", 404);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { session, error } = await requireStaff();
  if (error) return error;

  const { resource: raw } = await context.params;
  const resource = assertResource(raw);
  if (!resource) return jsonError("Unknown resource", 404);
  if (!canWrite(resource, session!.user.role)) return jsonError("Forbidden", 403);

  const body = await request.json().catch(() => null);
  const envelope = z.object({ id: z.string().min(1), patch: z.record(z.string(), z.unknown()) }).safeParse(body);
  if (!envelope.success) return jsonError("Validation failed", 400, envelope.error.flatten());

  const { id, patch } = envelope.data;

  let updated: unknown = null;
  if (resource === "destinations") {
    updated =
      (await dbUpdateDestination(id, patch as Partial<import("@/features/admin/types").DestinationRecord>)) ??
      cmsStore.updateDestination(id, patch);
  }
  if (resource === "cafes") updated = cmsStore.updateCafe(id, patch);
  if (resource === "guides") updated = cmsStore.updateGuide(id, patch);
  if (resource === "community") updated = cmsStore.updateCommunity(id, patch);
  if (resource === "categories") updated = cmsStore.updateCategory(id, patch);
  if (resource === "tags") updated = cmsStore.updateTag(id, patch);
  if (resource === "reviews") updated = cmsStore.updateReview(id, patch);
  if (resource === "media") updated = cmsStore.updateMedia(id, patch);

  if (!updated) return jsonError("Not found", 404);
  return jsonOk(updated);
}

export async function DELETE(request: Request, context: RouteContext) {
  const { session, error } = await requireStaff();
  if (error) return error;

  const { resource: raw } = await context.params;
  const resource = assertResource(raw);
  if (!resource) return jsonError("Unknown resource", 404);
  if (!canWrite(resource, session!.user.role)) return jsonError("Forbidden", 403);

  const body = await request.json().catch(() => null);
  const parsed = z.object({ ids: z.array(z.string()).min(1) }).safeParse(body);
  if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());

  switch (resource) {
    case "destinations":
      if (!(await dbDeleteDestinations(parsed.data.ids))) {
        cmsStore.deleteDestinations(parsed.data.ids);
      }
      break;
    case "cafes":
      cmsStore.deleteCafes(parsed.data.ids);
      break;
    case "guides":
      cmsStore.deleteGuides(parsed.data.ids);
      break;
    case "community":
      cmsStore.deleteCommunity(parsed.data.ids);
      break;
    case "categories":
      cmsStore.deleteCategories(parsed.data.ids);
      break;
    case "tags":
      cmsStore.deleteTags(parsed.data.ids);
      break;
    case "reviews":
      cmsStore.deleteReviews(parsed.data.ids);
      break;
    case "media":
      cmsStore.deleteMedia(parsed.data.ids);
      break;
    default:
      break;
  }

  return jsonOk({ ok: true });
}
