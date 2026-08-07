import "server-only";

import { isDatabaseReady, prisma } from "@/lib/prisma";
import type { ListQuery, Paginated } from "./query";
import { buildSearchText, paginateArray } from "./query";

type ContentStatus = "draft" | "published" | "archived";

function toJson(value: Record<string, unknown>) {
  return value as object;
}

async function canUseDatabase() {
  if (process.env.FORCE_STATIC_CATALOG === "1") return false;
  return isDatabaseReady();
}

export async function listDestinations(query: ListQuery): Promise<Paginated<Record<string, unknown>>> {
  if (await canUseDatabase()) {
    const where = {
      ...(query.status ? { status: query.status as ContentStatus } : {}),
      ...(query.q
        ? {
            OR: [
              { name: { contains: query.q, mode: "insensitive" as const } },
              { cityName: { contains: query.q, mode: "insensitive" as const } },
              { countryName: { contains: query.q, mode: "insensitive" as const } },
              { searchText: { contains: query.q.toLowerCase() } },
            ],
          }
        : {}),
    };
    const [total, rows] = await Promise.all([
      prisma.destination.count({ where }),
      prisma.destination.findMany({
        where,
        orderBy: { updatedAt: query.order },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      }),
    ]);
    return {
      items: rows.map(mapDestinationRow),
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.pageSize)),
    };
  }
  return paginateArray([], query.page, query.pageSize);
}

export async function getDestinationPayloadBySlug(slug: string) {
  if (!(await canUseDatabase())) return null;
  const row = await prisma.destination.findUnique({ where: { slug } });
  return row ? (row.payload as Record<string, unknown>) : null;
}

export async function listDestinationPayloads() {
  if (!(await canUseDatabase())) return null;
  const rows = await prisma.destination.findMany({
    where: { status: "published" },
    orderBy: { name: "asc" },
  });
  return rows.map((row) => row.payload as Record<string, unknown>);
}

export async function upsertDestinationFromPayload(payload: Record<string, unknown>) {
  if (!(await canUseDatabase())) return null;
  const slug = String(payload.slug);
  const name = String(payload.name);
  const countryName = String(payload.country ?? "");
  const cityName = String(payload.city ?? payload.name ?? "");
  const summary = String(payload.tagline ?? payload.description ?? "").slice(0, 500);
  const description = String(payload.description ?? "");
  const searchText = buildSearchText([
    name,
    cityName,
    countryName,
    summary,
    description,
    ...(Array.isArray(payload.tags) ? (payload.tags as string[]) : []),
  ]);

  return prisma.destination.upsert({
    where: { slug },
    create: {
      slug,
      name,
      countryName,
      cityName,
      region: typeof payload.region === "string" ? payload.region : null,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
    update: {
      name,
      countryName,
      cityName,
      region: typeof payload.region === "string" ? payload.region : null,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
  });
}

function mapDestinationRow(row: {
  id: string;
  slug: string;
  name: string;
  countryName: string;
  cityName: string;
  summary: string;
  status: string;
  coverImage: string | null;
  tags: string[];
  updatedAt: Date;
  createdAt: Date;
}) {
  return {
    id: row.id,
    title: row.name,
    slug: row.slug,
    country: row.countryName,
    city: row.cityName,
    summary: row.summary,
    status: row.status,
    coverImage: row.coverImage,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listCafePayloads() {
  if (!(await canUseDatabase())) return null;
  const rows = await prisma.cafe.findMany({
    where: { status: "published" },
    orderBy: { name: "asc" },
  });
  return rows.map((row) => row.payload as Record<string, unknown>);
}

export async function getCafePayloadBySlug(slug: string) {
  if (!(await canUseDatabase())) return null;
  const row = await prisma.cafe.findUnique({ where: { slug } });
  return row ? (row.payload as Record<string, unknown>) : null;
}

export async function upsertCafeFromPayload(payload: Record<string, unknown>) {
  if (!(await canUseDatabase())) return null;
  const slug = String(payload.slug);
  const name = String(payload.name);
  const countryName = String(payload.country ?? "");
  const cityName = String(payload.city ?? "");
  const summary = String(payload.tagline ?? payload.description ?? "").slice(0, 500);
  const description = String(payload.description ?? "");
  const amenities = Array.isArray(payload.amenities) ? (payload.amenities as string[]) : [];
  const searchText = buildSearchText([name, cityName, countryName, summary, description, ...amenities]);

  return prisma.cafe.upsert({
    where: { slug },
    create: {
      slug,
      name,
      countryName,
      cityName,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      amenities,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
    update: {
      name,
      countryName,
      cityName,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      amenities,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
  });
}

export async function listGuidePayloads() {
  if (!(await canUseDatabase())) return null;
  const rows = await prisma.guide.findMany({
    where: { status: "published" },
    orderBy: { title: "asc" },
  });
  return rows.map((row) => row.payload as Record<string, unknown>);
}

export async function getGuidePayloadBySlug(slug: string) {
  if (!(await canUseDatabase())) return null;
  const row = await prisma.guide.findUnique({ where: { slug } });
  return row ? (row.payload as Record<string, unknown>) : null;
}

export async function upsertGuideFromPayload(payload: Record<string, unknown>) {
  if (!(await canUseDatabase())) return null;
  const slug = String(payload.slug);
  const title = String(payload.title);
  const authorName = String(
    (payload.author as { name?: string } | undefined)?.name ?? payload.authorName ?? "Editor",
  );
  const excerpt = String(payload.excerpt ?? payload.summary ?? "");
  const searchText = buildSearchText([title, authorName, excerpt, String(payload.body ?? "")]);

  return prisma.guide.upsert({
    where: { slug },
    create: {
      slug,
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : "",
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
    update: {
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : "",
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
  });
}

export async function listCommunityPayloads() {
  if (!(await canUseDatabase())) return null;
  const rows = await prisma.communityPost.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((row) => row.payload as Record<string, unknown>);
}

export async function getCommunityPayloadBySlug(slug: string) {
  if (!(await canUseDatabase())) return null;
  const row = await prisma.communityPost.findUnique({ where: { slug } });
  return row ? (row.payload as Record<string, unknown>) : null;
}

export async function upsertCommunityFromPayload(payload: Record<string, unknown>) {
  if (!(await canUseDatabase())) return null;
  const slug = String(payload.slug);
  const title = String(payload.title);
  const authorName = String(
    (payload.author as { name?: string } | undefined)?.name ?? payload.authorName ?? "Traveler",
  );
  const excerpt = String(payload.excerpt ?? payload.summary ?? "");
  const searchText = buildSearchText([title, authorName, excerpt]);

  return prisma.communityPost.upsert({
    where: { slug },
    create: {
      slug,
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : excerpt,
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : null,
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
    update: {
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : excerpt,
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : null,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload: toJson(payload),
    },
  });
}
