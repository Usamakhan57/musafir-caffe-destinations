/**
 * Admin CMS Prisma bridge — prefers Postgres when available, keeps memory fallback.
 * UI/API shapes stay identical (no redesign).
 */
import "server-only";

import { isDatabaseReady, prisma } from "@/lib/prisma";
import { buildSearchText } from "@/server/db/query";
import type { ContentStatus, DestinationRecord, PaginatedResponse } from "../types";

function toCmsDestination(row: {
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
  createdAt: Date;
  updatedAt: Date;
}): DestinationRecord {
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
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function dbListDestinations(
  page = 1,
  pageSize = 10,
  q = "",
  status?: ContentStatus,
): Promise<PaginatedResponse<DestinationRecord> | null> {
  if (!(await isDatabaseReady())) return null;
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
  return {
    items: rows.map(toCmsDestination),
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function dbCreateDestination(input: Omit<DestinationRecord, "id" | "createdAt" | "updatedAt">) {
  if (!(await isDatabaseReady())) return null;
  const searchText = buildSearchText([
    input.title,
    input.city,
    input.country,
    input.summary,
    ...input.tags,
  ]);
  const payload = {
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
  const row = await prisma.destination.create({
    data: {
      slug: input.slug,
      name: input.title,
      countryName: input.country,
      cityName: input.city,
      summary: input.summary,
      description: input.summary,
      coverImage: input.coverImage,
      heroImage: input.coverImage,
      status: input.status,
      categoryId: input.categoryId,
      tags: input.tags,
      searchText,
      payload,
    },
  });
  return toCmsDestination(row);
}

export async function dbUpdateDestination(id: string, patch: Partial<DestinationRecord>) {
  if (!(await isDatabaseReady())) return null;
  const existing = await prisma.destination.findUnique({ where: { id } });
  if (!existing) return null;
  const name = patch.title ?? existing.name;
  const cityName = patch.city ?? existing.cityName;
  const countryName = patch.country ?? existing.countryName;
  const summary = patch.summary ?? existing.summary;
  const tags = patch.tags ?? existing.tags;
  const row = await prisma.destination.update({
    where: { id },
    data: {
      name,
      cityName,
      countryName,
      summary,
      description: summary,
      coverImage: patch.coverImage === undefined ? existing.coverImage : patch.coverImage,
      status: patch.status ?? existing.status,
      categoryId: patch.categoryId === undefined ? existing.categoryId : patch.categoryId,
      tags,
      searchText: buildSearchText([name, cityName, countryName, summary, ...tags]),
      payload: {
        ...(existing.payload as object),
        name,
        city: cityName,
        country: countryName,
        tagline: summary,
        description: summary,
        heroImage: patch.coverImage === undefined ? existing.coverImage : patch.coverImage,
        tags,
      },
    },
  });
  return toCmsDestination(row);
}

export async function dbDeleteDestinations(ids: string[]) {
  if (!(await isDatabaseReady())) return null;
  await prisma.destination.deleteMany({ where: { id: { in: ids } } });
  return { ok: true };
}

export async function dbListUsers(page = 1, pageSize = 10, q = "", role?: string) {
  if (!(await isDatabaseReady())) return null;
  const where = {
    ...(role
      ? {
          role: (role === "cafe-owner"
            ? "cafe_owner"
            : role === "guide-creator"
              ? "guide_creator"
              : role) as "traveler" | "admin" | "editor" | "moderator" | "cafe_owner" | "guide_creator",
        }
      : {}),
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
  const items = rows.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role:
      user.role === "cafe_owner"
        ? "cafe-owner"
        : user.role === "guide_creator"
          ? "guide-creator"
          : user.role,
    emailVerified: user.emailVerified,
    image: user.image ?? undefined,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
