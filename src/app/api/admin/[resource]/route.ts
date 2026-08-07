import { z } from "zod";

import {
  dbBulkStatus,
  dbCreateCafe,
  dbCreateCategory,
  dbCreateCommunity,
  dbCreateCountry,
  dbCreateCity,
  dbCreateGuide,
  dbCreateMedia,
  dbCreateReview,
  dbCreateTag,
  dbDeleteCategories,
  dbDeleteCities,
  dbDeleteCountries,
  dbDeleteMedia,
  dbDeleteTags,
  dbListCafes,
  dbListCategories,
  dbListCities,
  dbListCommunity,
  dbListCountries,
  dbListDestinations,
  dbListGuides,
  dbListMedia,
  dbListReviews,
  dbListTags,
  dbCreateDestination,
  dbUpdateCafe,
  dbUpdateCategory,
  dbUpdateCity,
  dbUpdateCommunity,
  dbUpdateCountry,
  dbUpdateDestination,
  dbUpdateGuide,
  dbUpdateMedia,
  dbUpdateReview,
  dbUpdateTag,
} from "@/features/admin/data/cms-db";
import {
  dbCreateAffiliate,
  dbCreateNewsletter,
  dbCreateNotification,
  dbCreateSeo,
  dbDeleteAffiliates,
  dbDeleteContact,
  dbDeleteHomepage,
  dbDeleteNewsletter,
  dbDeleteNotifications,
  dbDeleteSeo,
  dbDeleteSettings,
  dbListAffiliates,
  dbListContact,
  dbListHomepage,
  dbListNewsletter,
  dbListNotifications,
  dbListPayments,
  dbListSeo,
  dbListSettings,
  dbUpdateAffiliate,
  dbUpdateContact,
  dbUpdateHomepage,
  dbUpdateNewsletter,
  dbUpdateNotification,
  dbUpdatePayment,
  dbUpdateSeo,
  dbUpdateSetting,
  dbUpsertHomepage,
  dbUpsertSetting,
} from "@/features/admin/data/cms-extended";
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

const RESOURCES = new Set<AdminResource>([
  "destinations",
  "cafes",
  "guides",
  "community",
  "categories",
  "tags",
  "reviews",
  "media",
  "countries",
  "cities",
  "homepage",
  "seo",
  "settings",
  "contact",
  "newsletter",
  "notifications",
  "payments",
  "affiliates",
]);

type RouteContext = { params: Promise<{ resource: string }> };

function assertResource(value: string): AdminResource | null {
  return RESOURCES.has(value as AdminResource) ? (value as AdminResource) : null;
}

function canWrite(resource: AdminResource, role: string | undefined) {
  if (canManageUsers(role)) return true;
  if (resource === "reviews" || resource === "contact" || resource === "notifications") {
    return canModerate(role);
  }
  if (resource === "media" || resource === "newsletter") {
    return canEditContent(role) || canModerate(role);
  }
  if (resource === "payments" || resource === "affiliates" || resource === "settings") {
    return canManageUsers(role);
  }
  return canEditContent(role);
}

async function handleDb<T>(fn: () => Promise<T>) {
  try {
    return jsonOk(await fn());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database error";
    const status = message.includes("unavailable") ? 503 : 400;
    return jsonError(message, status);
  }
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
    case "destinations":
      return handleDb(() => dbListDestinations(page, pageSize, q, status));
    case "cafes":
      return handleDb(() => dbListCafes(page, pageSize, q, status));
    case "guides":
      return handleDb(() => dbListGuides(page, pageSize, q, status));
    case "community":
      return handleDb(() => dbListCommunity(page, pageSize, q, status));
    case "categories":
      return handleDb(() => dbListCategories(page, pageSize, q));
    case "tags":
      return handleDb(() => dbListTags(page, pageSize, q));
    case "reviews":
      return handleDb(() => dbListReviews(page, pageSize, q, status));
    case "media":
      return handleDb(() => dbListMedia(page, pageSize, q));
    case "countries":
      return handleDb(() => dbListCountries(page, pageSize, q));
    case "cities":
      return handleDb(() => dbListCities(page, pageSize, q));
    case "homepage":
      return handleDb(() => dbListHomepage(page, pageSize, q));
    case "seo":
      return handleDb(() => dbListSeo(page, pageSize, q));
    case "settings":
      return handleDb(() => dbListSettings(page, pageSize, q));
    case "contact":
      return handleDb(() => dbListContact(page, pageSize, q));
    case "newsletter":
      return handleDb(() => dbListNewsletter(page, pageSize, q));
    case "notifications":
      return handleDb(() => dbListNotifications(page, pageSize, q));
    case "payments":
      return handleDb(() => dbListPayments(page, pageSize, q));
    case "affiliates":
      return handleDb(() => dbListAffiliates(page, pageSize, q));
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
    try {
      if (resource === "destinations") await dbBulkStatus("destination", bulk.data.ids, bulk.data.action);
      else if (resource === "cafes") await dbBulkStatus("cafe", bulk.data.ids, bulk.data.action);
      else if (resource === "guides") await dbBulkStatus("guide", bulk.data.ids, bulk.data.action);
      else if (resource === "community") await dbBulkStatus("communityPost", bulk.data.ids, bulk.data.action);
      else if (resource === "reviews") await dbBulkStatus("review", bulk.data.ids, bulk.data.action);
      else if (resource === "categories" && bulk.data.action === "delete") await dbDeleteCategories(bulk.data.ids);
      else if (resource === "tags" && bulk.data.action === "delete") await dbDeleteTags(bulk.data.ids);
      else if (resource === "media" && bulk.data.action === "delete") await dbDeleteMedia(bulk.data.ids);
      else if (resource === "countries" && bulk.data.action === "delete") await dbDeleteCountries(bulk.data.ids);
      else if (resource === "cities" && bulk.data.action === "delete") await dbDeleteCities(bulk.data.ids);
      else if (resource === "homepage" && bulk.data.action === "delete") await dbDeleteHomepage(bulk.data.ids);
      else if (resource === "seo" && bulk.data.action === "delete") await dbDeleteSeo(bulk.data.ids);
      else if (resource === "settings" && bulk.data.action === "delete") await dbDeleteSettings(bulk.data.ids);
      else if (resource === "contact" && bulk.data.action === "delete") await dbDeleteContact(bulk.data.ids);
      else if (resource === "newsletter" && bulk.data.action === "delete") await dbDeleteNewsletter(bulk.data.ids);
      else if (resource === "notifications" && bulk.data.action === "delete") await dbDeleteNotifications(bulk.data.ids);
      else if (resource === "affiliates" && bulk.data.action === "delete") await dbDeleteAffiliates(bulk.data.ids);
      else return jsonError("Unsupported bulk action", 400);
      return jsonOk({ ok: true });
    } catch (err) {
      return jsonError(err instanceof Error ? err.message : "Bulk failed", 503);
    }
  }

  switch (resource) {
    case "destinations": {
      const parsed = destinationInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateDestination({
        ...parsed.data,
        categoryId: parsed.data.categoryId ?? null,
        coverImage: parsed.data.coverImage ?? null,
      }).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "cafes": {
      const parsed = cafeInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateCafe({
        ...parsed.data,
        categoryId: parsed.data.categoryId ?? null,
        coverImage: parsed.data.coverImage ?? null,
      }).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "guides": {
      const parsed = guideInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateGuide({
        ...parsed.data,
        categoryId: parsed.data.categoryId ?? null,
        coverImage: parsed.data.coverImage ?? null,
      }).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "community": {
      const parsed = communityInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateCommunity({
        ...parsed.data,
        categoryId: parsed.data.categoryId ?? null,
        coverImage: parsed.data.coverImage ?? null,
      }).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "categories": {
      const parsed = categoryInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateCategory(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "tags": {
      const parsed = tagInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateTag(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "reviews": {
      const parsed = reviewInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateReview(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "media": {
      const parsed = mediaInputSchema.safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateMedia({
        ...parsed.data,
        uploadedById: session!.user.id,
      }).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "countries": {
      const parsed = z
        .object({
          name: z.string().min(2),
          slug: z.string().min(2),
          code: z.string().optional(),
          flag: z.string().optional(),
          region: z.string().optional(),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateCountry(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "cities": {
      const parsed = z
        .object({
          name: z.string().min(2),
          slug: z.string().min(2),
          countryId: z.string().uuid(),
          lat: z.coerce.number().optional(),
          lng: z.coerce.number().optional(),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateCity(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "homepage": {
      const parsed = z.object({ key: z.string().min(1), payload: z.string().min(2) }).safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbUpsertHomepage(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 400);
      return jsonOk(created, 201);
    }
    case "seo": {
      const parsed = z
        .object({
          path: z.string().min(1),
          title: z.string().min(2),
          description: z.string().min(8),
          ogImage: z.string().optional(),
          canonicalUrl: z.string().optional(),
          noIndex: z.union([z.boolean(), z.string()]).optional(),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateSeo(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "settings": {
      const parsed = z
        .object({ key: z.string().min(1), label: z.string().min(1), value: z.string().min(1) })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbUpsertSetting(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "newsletter": {
      const parsed = z
        .object({
          email: z.string().email(),
          name: z.string().optional(),
          status: z.string().optional(),
          source: z.string().optional(),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateNewsletter(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "notifications": {
      const parsed = z
        .object({
          userId: z.string().min(1),
          kind: z.string().min(1),
          title: z.string().min(2),
          message: z.string().min(2),
          href: z.string().optional(),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateNotification(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "affiliates": {
      const parsed = z
        .object({
          name: z.string().min(2),
          network: z.string().min(2),
          category: z.string().min(2),
          commissionLabel: z.string().min(1),
          trackingParam: z.string().min(1),
        })
        .safeParse(body);
      if (!parsed.success) return jsonError("Validation failed", 400, parsed.error.flatten());
      const created = await dbCreateAffiliate(parsed.data).catch((err: Error) => err);
      if (created instanceof Error) return jsonError(created.message, 503);
      return jsonOk(created, 201);
    }
    case "contact":
    case "payments":
      return jsonError("Create not supported for this resource", 405);
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
  const envelope = z
    .object({ id: z.string().min(1), patch: z.record(z.string(), z.unknown()) })
    .safeParse(body);
  if (!envelope.success) return jsonError("Validation failed", 400, envelope.error.flatten());

  const { id, patch } = envelope.data;

  try {
    let updated: unknown = null;
    if (resource === "destinations") updated = await dbUpdateDestination(id, patch);
    if (resource === "cafes") updated = await dbUpdateCafe(id, patch);
    if (resource === "guides") updated = await dbUpdateGuide(id, patch);
    if (resource === "community") updated = await dbUpdateCommunity(id, patch);
    if (resource === "categories") updated = await dbUpdateCategory(id, patch);
    if (resource === "tags") updated = await dbUpdateTag(id, patch);
    if (resource === "reviews") updated = await dbUpdateReview(id, patch);
    if (resource === "media") updated = await dbUpdateMedia(id, patch);
    if (resource === "countries") updated = await dbUpdateCountry(id, patch);
    if (resource === "cities") updated = await dbUpdateCity(id, patch);
    if (resource === "homepage") updated = await dbUpdateHomepage(id, patch as { key?: string; payload?: string });
    if (resource === "seo") updated = await dbUpdateSeo(id, patch);
    if (resource === "settings") updated = await dbUpdateSetting(id, patch as { key?: string; label?: string; value?: string });
    if (resource === "contact") updated = await dbUpdateContact(id, patch as { status?: string });
    if (resource === "newsletter") updated = await dbUpdateNewsletter(id, patch as { email?: string; name?: string; status?: string; source?: string });
    if (resource === "notifications") updated = await dbUpdateNotification(id, patch);
    if (resource === "payments") updated = await dbUpdatePayment(id, patch as { status?: string });
    if (resource === "affiliates") updated = await dbUpdateAffiliate(id, patch);

    if (!updated) return jsonError("Not found", 404);
    return jsonOk(updated);
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Update failed", 400);
  }
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

  try {
    if (resource === "destinations") await dbBulkStatus("destination", parsed.data.ids, "delete");
    else if (resource === "cafes") await dbBulkStatus("cafe", parsed.data.ids, "delete");
    else if (resource === "guides") await dbBulkStatus("guide", parsed.data.ids, "delete");
    else if (resource === "community") await dbBulkStatus("communityPost", parsed.data.ids, "delete");
    else if (resource === "categories") await dbDeleteCategories(parsed.data.ids);
    else if (resource === "tags") await dbDeleteTags(parsed.data.ids);
    else if (resource === "reviews") await dbBulkStatus("review", parsed.data.ids, "delete");
    else if (resource === "media") await dbDeleteMedia(parsed.data.ids);
    else if (resource === "countries") await dbDeleteCountries(parsed.data.ids);
    else if (resource === "cities") await dbDeleteCities(parsed.data.ids);
    else if (resource === "homepage") await dbDeleteHomepage(parsed.data.ids);
    else if (resource === "seo") await dbDeleteSeo(parsed.data.ids);
    else if (resource === "settings") await dbDeleteSettings(parsed.data.ids);
    else if (resource === "contact") await dbDeleteContact(parsed.data.ids);
    else if (resource === "newsletter") await dbDeleteNewsletter(parsed.data.ids);
    else if (resource === "notifications") await dbDeleteNotifications(parsed.data.ids);
    else if (resource === "affiliates") await dbDeleteAffiliates(parsed.data.ids);
    else return jsonError("Delete not supported", 405);
    return jsonOk({ ok: true });
  } catch (err) {
    return jsonError(err instanceof Error ? err.message : "Delete failed", 503);
  }
}
