/**
 * Production Admin CMS repository — Prisma/PostgreSQL only (no memory store).
 * Response shapes match existing Admin UI ResourceManager contracts.
 */
import "server-only";

import { hash } from "bcryptjs";

import { isDatabaseReady, prisma } from "@/lib/prisma";
import { buildSearchText } from "@/server/db/query";

import type {
  AnalyticsSnapshot,
  CafeRecord,
  CategoryRecord,
  CmsUserRecord,
  CommunityRecord,
  ContentStatus,
  DestinationRecord,
  GuideRecord,
  MediaRecord,
  PaginatedResponse,
  ReviewRecord,
  TagRecord,
} from "../types";

function toJson(value: unknown) {
  return value as object;
}

function requireDb() {
  return isDatabaseReady();
}

function paginateMeta(total: number, page: number, pageSize: number) {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

function mapRoleToDb(role: string) {
  if (role === "cafe-owner") return "cafe_owner" as const;
  if (role === "guide-creator") return "guide_creator" as const;
  return role as "traveler" | "admin" | "editor" | "moderator" | "cafe_owner" | "guide_creator";
}

function mapRoleFromDb(role: string) {
  if (role === "cafe_owner") return "cafe-owner";
  if (role === "guide_creator") return "guide-creator";
  return role;
}

function toDestination(row: {
  id: string;
  slug: string;
  name: string;
  countryName: string;
  cityName: string;
  summary: string;
  status: string;
  coverImage: string | null;
  tags: string[];
  categoryId: string | null;
  payload: unknown;
  createdAt: Date;
  updatedAt: Date;
}): DestinationRecord & { payload?: string } {
  return {
    id: row.id,
    title: row.name,
    slug: row.slug,
    country: row.countryName,
    city: row.cityName,
    summary: row.summary,
    status: row.status as ContentStatus,
    categoryId: row.categoryId,
    coverImage: row.coverImage,
    tags: row.tags,
    payload: JSON.stringify(row.payload ?? {}, null, 2),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function parsePayload(raw: unknown, fallback: Record<string, unknown>) {
  if (typeof raw === "string" && raw.trim()) {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return fallback;
    }
  }
  if (raw && typeof raw === "object") return raw as Record<string, unknown>;
  return fallback;
}

export async function dbListDestinations(
  page = 1,
  pageSize = 10,
  q = "",
  status?: ContentStatus,
): Promise<PaginatedResponse<DestinationRecord>> {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { cityName: { contains: q, mode: "insensitive" as const } },
            { countryName: { contains: q, mode: "insensitive" as const } },
            { searchText: { contains: q.toLowerCase() } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.destination.count({ where }),
    prisma.destination.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return { items: rows.map(toDestination), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateDestination(
  input: Omit<DestinationRecord, "id" | "createdAt" | "updatedAt"> & { payload?: string },
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const searchText = buildSearchText([
    input.title,
    input.city,
    input.country,
    input.summary,
    ...input.tags,
  ]);
  const fallbackPayload = {
    slug: input.slug,
    name: input.title,
    city: input.city,
    country: input.country,
    tagline: input.summary,
    description: input.summary,
    heroImage: input.coverImage ?? "",
    rating: 0,
    reviewCount: 0,
    tags: input.tags,
  };
  const payload = parsePayload(input.payload, fallbackPayload);
  const row = await prisma.destination.create({
    data: {
      slug: input.slug,
      name: input.title,
      countryName: input.country,
      cityName: input.city,
      summary: input.summary,
      description: String(payload.description ?? input.summary),
      coverImage: input.coverImage,
      heroImage: input.coverImage,
      status: input.status,
      categoryId: input.categoryId,
      tags: input.tags,
      searchText,
      payload: toJson(payload),
    },
  });
  return toDestination(row);
}

export async function dbUpdateDestination(
  id: string,
  patch: Partial<DestinationRecord> & { payload?: string },
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.destination.findUnique({ where: { id } });
  if (!existing) return null;
  const name = patch.title ?? existing.name;
  const cityName = patch.city ?? existing.cityName;
  const countryName = patch.country ?? existing.countryName;
  const summary = patch.summary ?? existing.summary;
  const tags = patch.tags ?? existing.tags;
  const coverImage =
    patch.coverImage === undefined ? existing.coverImage : patch.coverImage;
  const basePayload = {
    ...(existing.payload as object),
    name,
    city: cityName,
    country: countryName,
    tagline: summary,
    description: summary,
    heroImage: coverImage,
    tags,
  };
  const payload = patch.payload !== undefined ? parsePayload(patch.payload, basePayload) : basePayload;
  const row = await prisma.destination.update({
    where: { id },
    data: {
      name,
      slug: patch.slug ?? existing.slug,
      cityName,
      countryName,
      summary,
      description: String((payload as { description?: string }).description ?? summary),
      coverImage,
      heroImage: coverImage,
      status: patch.status ?? existing.status,
      categoryId: patch.categoryId === undefined ? existing.categoryId : patch.categoryId,
      tags,
      searchText: buildSearchText([name, cityName, countryName, summary, ...tags]),
      payload: toJson(payload),
    },
  });
  return toDestination(row);
}

export async function dbBulkStatus(
  model: "destination" | "cafe" | "guide" | "communityPost" | "review",
  ids: string[],
  action: "delete" | "publish" | "archive" | "draft",
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  if (action === "delete") {
    if (model === "destination") await prisma.destination.deleteMany({ where: { id: { in: ids } } });
    if (model === "cafe") await prisma.cafe.deleteMany({ where: { id: { in: ids } } });
    if (model === "guide") await prisma.guide.deleteMany({ where: { id: { in: ids } } });
    if (model === "communityPost") await prisma.communityPost.deleteMany({ where: { id: { in: ids } } });
    if (model === "review") await prisma.review.deleteMany({ where: { id: { in: ids } } });
    return { ok: true };
  }
  const status = action === "publish" ? "published" : action === "archive" ? "archived" : "draft";
  if (model === "destination") await prisma.destination.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (model === "cafe") await prisma.cafe.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (model === "guide") await prisma.guide.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (model === "communityPost") await prisma.communityPost.updateMany({ where: { id: { in: ids } }, data: { status } });
  if (model === "review") await prisma.review.updateMany({ where: { id: { in: ids } }, data: { status } });
  return { ok: true };
}

export async function dbDeleteDestinations(ids: string[]) {
  return dbBulkStatus("destination", ids, "delete");
}

function toCafe(row: {
  id: string;
  slug: string;
  name: string;
  cityName: string;
  countryName: string;
  summary: string;
  status: string;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}): CafeRecord {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    city: row.cityName,
    country: row.countryName,
    summary: row.summary,
    status: row.status as ContentStatus,
    categoryId: row.categoryId,
    coverImage: row.coverImage,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListCafes(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { cityName: { contains: q, mode: "insensitive" as const } },
            { countryName: { contains: q, mode: "insensitive" as const } },
            { searchText: { contains: q.toLowerCase() } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.cafe.count({ where }),
    prisma.cafe.findMany({ where, orderBy: { updatedAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return { items: rows.map(toCafe), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateCafe(input: Omit<CafeRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const payload = {
    slug: input.slug,
    name: input.name,
    city: input.city,
    country: input.country,
    tagline: input.summary,
    description: input.summary,
    heroImage: input.coverImage ?? "",
    tags: input.tags,
  };
  const row = await prisma.cafe.create({
    data: {
      slug: input.slug,
      name: input.name,
      cityName: input.city,
      countryName: input.country,
      summary: input.summary,
      description: input.summary,
      coverImage: input.coverImage,
      heroImage: input.coverImage,
      status: input.status,
      categoryId: input.categoryId,
      tags: input.tags,
      searchText: buildSearchText([input.name, input.city, input.country, input.summary, ...input.tags]),
      payload: toJson(payload),
    },
  });
  return toCafe(row);
}

export async function dbUpdateCafe(id: string, patch: Partial<CafeRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.cafe.findUnique({ where: { id } });
  if (!existing) return null;
  const name = patch.name ?? existing.name;
  const cityName = patch.city ?? existing.cityName;
  const countryName = patch.country ?? existing.countryName;
  const summary = patch.summary ?? existing.summary;
  const tags = patch.tags ?? existing.tags;
  const coverImage = patch.coverImage === undefined ? existing.coverImage : patch.coverImage;
  const row = await prisma.cafe.update({
    where: { id },
    data: {
      name,
      slug: patch.slug ?? existing.slug,
      cityName,
      countryName,
      summary,
      description: summary,
      coverImage,
      heroImage: coverImage,
      status: patch.status ?? existing.status,
      categoryId: patch.categoryId === undefined ? existing.categoryId : patch.categoryId,
      tags,
      searchText: buildSearchText([name, cityName, countryName, summary, ...tags]),
      payload: toJson({
        ...(existing.payload as object),
        name,
        city: cityName,
        country: countryName,
        tagline: summary,
        description: summary,
        heroImage: coverImage,
        tags,
      }),
    },
  });
  return toCafe(row);
}

function toGuide(row: {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  excerpt: string;
  status: string;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}): GuideRecord {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    authorName: row.authorName,
    summary: row.excerpt,
    status: row.status as ContentStatus,
    categoryId: row.categoryId,
    coverImage: row.coverImage,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListGuides(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { authorName: { contains: q, mode: "insensitive" as const } },
            { searchText: { contains: q.toLowerCase() } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.guide.count({ where }),
    prisma.guide.findMany({ where, orderBy: { updatedAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return { items: rows.map(toGuide), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateGuide(input: Omit<GuideRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const payload = {
    slug: input.slug,
    title: input.title,
    authorName: input.authorName,
    excerpt: input.summary,
    coverImage: input.coverImage,
    tags: input.tags,
  };
  const row = await prisma.guide.create({
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.summary,
      body: "",
      authorName: input.authorName,
      coverImage: input.coverImage,
      status: input.status,
      categoryId: input.categoryId,
      tags: input.tags,
      searchText: buildSearchText([input.title, input.authorName, input.summary, ...input.tags]),
      payload: toJson(payload),
    },
  });
  return toGuide(row);
}

export async function dbUpdateGuide(id: string, patch: Partial<GuideRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.guide.findUnique({ where: { id } });
  if (!existing) return null;
  const title = patch.title ?? existing.title;
  const authorName = patch.authorName ?? existing.authorName;
  const excerpt = patch.summary ?? existing.excerpt;
  const tags = patch.tags ?? existing.tags;
  const coverImage = patch.coverImage === undefined ? existing.coverImage : patch.coverImage;
  const row = await prisma.guide.update({
    where: { id },
    data: {
      title,
      slug: patch.slug ?? existing.slug,
      authorName,
      excerpt,
      coverImage,
      status: patch.status ?? existing.status,
      categoryId: patch.categoryId === undefined ? existing.categoryId : patch.categoryId,
      tags,
      searchText: buildSearchText([title, authorName, excerpt, ...tags]),
      payload: toJson({
        ...(existing.payload as object),
        title,
        authorName,
        excerpt,
        coverImage,
        tags,
      }),
    },
  });
  return toGuide(row);
}

function toCommunity(row: {
  id: string;
  slug: string;
  title: string;
  authorName: string;
  excerpt: string | null;
  status: string;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}): CommunityRecord {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    authorName: row.authorName,
    summary: row.excerpt ?? "",
    status: row.status as ContentStatus,
    categoryId: row.categoryId,
    coverImage: row.coverImage,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListCommunity(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { authorName: { contains: q, mode: "insensitive" as const } },
            { searchText: { contains: q.toLowerCase() } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.communityPost.count({ where }),
    prisma.communityPost.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return { items: rows.map(toCommunity), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateCommunity(input: Omit<CommunityRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const payload = {
    slug: input.slug,
    title: input.title,
    authorName: input.authorName,
    excerpt: input.summary,
    coverImage: input.coverImage,
    tags: input.tags,
  };
  const row = await prisma.communityPost.create({
    data: {
      slug: input.slug,
      title: input.title,
      body: input.summary,
      excerpt: input.summary,
      authorName: input.authorName,
      coverImage: input.coverImage,
      status: input.status,
      categoryId: input.categoryId,
      tags: input.tags,
      searchText: buildSearchText([input.title, input.authorName, input.summary, ...input.tags]),
      payload: toJson(payload),
    },
  });
  return toCommunity(row);
}

export async function dbUpdateCommunity(id: string, patch: Partial<CommunityRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.communityPost.findUnique({ where: { id } });
  if (!existing) return null;
  const title = patch.title ?? existing.title;
  const authorName = patch.authorName ?? existing.authorName;
  const excerpt = patch.summary ?? existing.excerpt ?? "";
  const tags = patch.tags ?? existing.tags;
  const coverImage = patch.coverImage === undefined ? existing.coverImage : patch.coverImage;
  const row = await prisma.communityPost.update({
    where: { id },
    data: {
      title,
      slug: patch.slug ?? existing.slug,
      authorName,
      excerpt,
      body: excerpt,
      coverImage,
      status: patch.status ?? existing.status,
      categoryId: patch.categoryId === undefined ? existing.categoryId : patch.categoryId,
      tags,
      searchText: buildSearchText([title, authorName, excerpt, ...tags]),
      payload: toJson({
        ...(existing.payload as object),
        title,
        authorName,
        excerpt,
        coverImage,
        tags,
      }),
    },
  });
  return toCommunity(row);
}

export async function dbListCategories(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { slug: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({ where, orderBy: { name: "asc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  const items: CategoryRecord[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    scope: row.scope,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
  return { items, ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateCategory(input: Omit<CategoryRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      scope: input.scope,
    },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    scope: row.scope,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } satisfies CategoryRecord;
}

export async function dbUpdateCategory(id: string, patch: Partial<CategoryRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.category.update({
    where: { id },
    data: {
      name: patch.name ?? existing.name,
      slug: patch.slug ?? existing.slug,
      description: patch.description ?? existing.description,
      scope: patch.scope ?? existing.scope,
    },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    scope: row.scope,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } satisfies CategoryRecord;
}

export async function dbDeleteCategories(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.category.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListTags(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { slug: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.tag.count({ where }),
    prisma.tag.findMany({ where, orderBy: { name: "asc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  const items: TagRecord[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
  return { items, ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateTag(input: Omit<TagRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.tag.create({ data: { name: input.name, slug: input.slug } });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } satisfies TagRecord;
}

export async function dbUpdateTag(id: string, patch: Partial<TagRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.tag.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.tag.update({
    where: { id },
    data: { name: patch.name ?? existing.name, slug: patch.slug ?? existing.slug },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  } satisfies TagRecord;
}

export async function dbDeleteTags(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.tag.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

function toReview(row: {
  id: string;
  targetType: string;
  targetId: string;
  targetName: string;
  rating: number;
  body: string;
  status: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}): ReviewRecord {
  return {
    id: row.id,
    targetType: row.targetType as ReviewRecord["targetType"],
    targetId: row.targetId,
    targetName: row.targetName,
    rating: row.rating,
    body: row.body,
    status: row.status as ContentStatus,
    authorName: row.authorName,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListReviews(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { targetName: { contains: q, mode: "insensitive" as const } },
            { authorName: { contains: q, mode: "insensitive" as const } },
            { body: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.review.count({ where }),
    prisma.review.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return { items: rows.map(toReview), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateReview(input: Omit<ReviewRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.review.create({
    data: {
      targetType: input.targetType,
      targetId: input.targetId,
      targetName: input.targetName,
      rating: input.rating,
      body: input.body,
      status: input.status,
      authorName: input.authorName,
    },
  });
  return toReview(row);
}

export async function dbUpdateReview(id: string, patch: Partial<ReviewRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.review.update({
    where: { id },
    data: {
      targetType: patch.targetType ?? existing.targetType,
      targetId: patch.targetId ?? existing.targetId,
      targetName: patch.targetName ?? existing.targetName,
      rating: patch.rating ?? existing.rating,
      body: patch.body ?? existing.body,
      status: patch.status ?? existing.status,
      authorName: patch.authorName ?? existing.authorName,
    },
  });
  return toReview(row);
}

export async function dbDeleteReviews(ids: string[]) {
  return dbBulkStatus("review", ids, "delete");
}

function toMedia(row: {
  id: string;
  title: string;
  url: string;
  alt: string | null;
  mimeType: string;
  sizeBytes: number;
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}): MediaRecord {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    alt: row.alt ?? "",
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    folder: row.folder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListMedia(page = 1, pageSize = 24, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { folder: { contains: q, mode: "insensitive" as const } },
          { alt: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.mediaAsset.count({ where }),
    prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return { items: rows.map(toMedia), ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateMedia(
  input: Omit<MediaRecord, "id" | "createdAt" | "updatedAt"> & {
    provider?: "url" | "supabase" | "local";
    storagePath?: string | null;
    uploadedById?: string | null;
  },
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.mediaAsset.create({
    data: {
      title: input.title,
      url: input.url,
      alt: input.alt,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      folder: input.folder,
      provider: input.provider ?? "url",
      storagePath: input.storagePath ?? null,
      uploadedById: input.uploadedById ?? null,
    },
  });
  return toMedia(row);
}

export async function dbUpdateMedia(id: string, patch: Partial<MediaRecord>) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.mediaAsset.update({
    where: { id },
    data: {
      title: patch.title ?? existing.title,
      url: patch.url ?? existing.url,
      alt: patch.alt ?? existing.alt,
      mimeType: patch.mimeType ?? existing.mimeType,
      sizeBytes: patch.sizeBytes ?? existing.sizeBytes,
      folder: patch.folder ?? existing.folder,
    },
  });
  return toMedia(row);
}

export async function dbDeleteMedia(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.mediaAsset.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListUsers(page = 1, pageSize = 10, q = "", role?: string) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = {
    ...(role ? { role: mapRoleToDb(role) } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [total, rows] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  const items: CmsUserRecord[] = rows.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: mapRoleFromDb(user.role) as CmsUserRecord["role"],
    emailVerified: user.emailVerified,
    image: user.image ?? undefined,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
  return { items, ...paginateMeta(total, page, pageSize) };
}

export async function dbCreateUser(
  input: Omit<CmsUserRecord, "id" | "createdAt" | "updatedAt"> & { password?: string },
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const passwordHash = input.password ? await hash(input.password, 12) : "";
  const created = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      role: mapRoleToDb(input.role),
      emailVerified: input.emailVerified,
      image: input.image ?? null,
      password: passwordHash,
    },
  });
  await prisma.profile.create({
    data: { userId: created.id, displayName: created.name },
  });
  return {
    id: created.id,
    name: created.name,
    email: created.email,
    role: mapRoleFromDb(created.role) as CmsUserRecord["role"],
    emailVerified: created.emailVerified,
    image: created.image ?? undefined,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  } satisfies CmsUserRecord;
}

export async function dbUpdateUser(id: string, patch: Partial<CmsUserRecord> & { password?: string }) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return null;
  const data: {
    name?: string;
    email?: string;
    role?: ReturnType<typeof mapRoleToDb>;
    emailVerified?: boolean;
    image?: string | null;
    password?: string;
  } = {
    name: patch.name ?? existing.name,
    email: patch.email ?? existing.email,
    role: patch.role ? mapRoleToDb(patch.role) : existing.role,
    emailVerified: patch.emailVerified ?? existing.emailVerified,
    image: patch.image === undefined ? existing.image : patch.image,
  };
  if (patch.password) {
    data.password = await hash(patch.password, 12);
  }
  const updated = await prisma.user.update({ where: { id }, data });
  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: mapRoleFromDb(updated.role) as CmsUserRecord["role"],
    emailVerified: updated.emailVerified,
    image: updated.image ?? undefined,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  } satisfies CmsUserRecord;
}

export async function dbDeleteUsers(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbAnalytics(): Promise<AnalyticsSnapshot> {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const [
    users,
    destinations,
    cafes,
    guides,
    community,
    reviews,
    media,
    publishedDest,
    publishedCafe,
    publishedGuide,
    publishedCommunity,
    draftDest,
    pendingReviews,
    payments,
    memberships,
    affiliateClicks,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.destination.count(),
    prisma.cafe.count(),
    prisma.guide.count(),
    prisma.communityPost.count(),
    prisma.review.count(),
    prisma.mediaAsset.count(),
    prisma.destination.count({ where: { status: "published" } }),
    prisma.cafe.count({ where: { status: "published" } }),
    prisma.guide.count({ where: { status: "published" } }),
    prisma.communityPost.count({ where: { status: "published" } }),
    prisma.destination.count({ where: { status: "draft" } }),
    prisma.review.count({ where: { status: "draft" } }),
    prisma.paymentIntentRecord.aggregate({ _sum: { amount: true }, _count: true }),
    prisma.membership.count({ where: { status: "active" } }),
    prisma.affiliateClick.count(),
  ]);

  return {
    users,
    destinations,
    cafes,
    guides,
    community,
    reviews,
    media,
    published: publishedDest + publishedCafe + publishedGuide + publishedCommunity,
    draft: draftDest,
    pendingReviews,
    revenueCents: payments._sum.amount ?? 0,
    paymentCount: payments._count,
    memberships,
    affiliateClicks,
    traffic: affiliateClicks + users * 3,
  };
}

/** Countries / cities */
export async function dbListCountries(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { slug: { contains: q, mode: "insensitive" as const } },
          { code: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.country.count({ where }),
    prisma.country.findMany({ where, orderBy: { name: "asc" }, skip: (page - 1) * pageSize, take: pageSize }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      code: row.code ?? "",
      flag: row.flag ?? "",
      region: row.region ?? "",
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateCountry(input: {
  name: string;
  slug: string;
  code?: string;
  flag?: string;
  region?: string;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.country.create({
    data: {
      name: input.name,
      slug: input.slug,
      code: input.code || null,
      flag: input.flag || null,
      region: input.region || null,
    },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    code: row.code ?? "",
    flag: row.flag ?? "",
    region: row.region ?? "",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateCountry(
  id: string,
  patch: Partial<{ name: string; slug: string; code: string; flag: string; region: string }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.country.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.country.update({
    where: { id },
    data: {
      name: patch.name ?? existing.name,
      slug: patch.slug ?? existing.slug,
      code: patch.code === undefined ? existing.code : patch.code || null,
      flag: patch.flag === undefined ? existing.flag : patch.flag || null,
      region: patch.region === undefined ? existing.region : patch.region || null,
    },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    code: row.code ?? "",
    flag: row.flag ?? "",
    region: row.region ?? "",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteCountries(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.country.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListCities(page = 1, pageSize = 10, q = "") {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { slug: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, rows] = await Promise.all([
    prisma.city.count({ where }),
    prisma.city.findMany({
      where,
      include: { country: true },
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      countryId: row.countryId,
      countryName: row.country.name,
      lat: row.lat ?? 0,
      lng: row.lng ?? 0,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
    ...paginateMeta(total, page, pageSize),
  };
}

export async function dbCreateCity(input: {
  name: string;
  slug: string;
  countryId: string;
  lat?: number;
  lng?: number;
}) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const row = await prisma.city.create({
    data: {
      name: input.name,
      slug: input.slug,
      countryId: input.countryId,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
    },
    include: { country: true },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    countryId: row.countryId,
    countryName: row.country.name,
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbUpdateCity(
  id: string,
  patch: Partial<{ name: string; slug: string; countryId: string; lat: number; lng: number }>,
) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  const existing = await prisma.city.findUnique({ where: { id } });
  if (!existing) return null;
  const row = await prisma.city.update({
    where: { id },
    data: {
      name: patch.name ?? existing.name,
      slug: patch.slug ?? existing.slug,
      countryId: patch.countryId ?? existing.countryId,
      lat: patch.lat === undefined ? existing.lat : patch.lat,
      lng: patch.lng === undefined ? existing.lng : patch.lng,
    },
    include: { country: true },
  });
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    countryId: row.countryId,
    countryName: row.country.name,
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbDeleteCities(ids: string[]) {
  if (!(await requireDb())) throw new Error("Database unavailable");
  await prisma.city.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}
