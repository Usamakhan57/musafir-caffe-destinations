import "server-only";

import { isDatabaseReady, prisma } from "@/lib/prisma";
import { sanitizePlainText } from "./query";

function toJson(value: unknown) {
  return value as object;
}

export async function listNotificationsForUser(userId: string) {
  if (!(await isDatabaseReady())) return null;
  return prisma.appNotification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function createNotification(input: {
  userId: string;
  kind: string;
  title: string;
  message: string;
  href?: string;
}) {
  if (!(await isDatabaseReady())) return null;
  return prisma.appNotification.create({
    data: {
      userId: input.userId,
      kind: input.kind,
      title: sanitizePlainText(input.title, 160),
      message: sanitizePlainText(input.message, 1000),
      href: input.href,
      unread: true,
    },
  });
}

export async function markNotificationsRead(userId: string, ids: string[]) {
  if (!(await isDatabaseReady())) return null;
  await prisma.appNotification.updateMany({
    where: { userId, id: { in: ids } },
    data: { unread: false },
  });
  return { ok: true };
}

export async function deleteNotifications(userId: string, ids: string[]) {
  if (!(await isDatabaseReady())) return null;
  await prisma.appNotification.deleteMany({
    where: { userId, id: { in: ids } },
  });
  return { ok: true };
}

export async function createReviewRecord(input: {
  targetType: "destination" | "cafe" | "guide" | "community" | "hotel" | "tour" | "gear";
  targetId: string;
  targetName: string;
  rating: number;
  title?: string;
  body: string;
  photos?: string[];
  authorId?: string;
  authorName: string;
  authorEmail?: string;
  status?: "draft" | "published" | "archived";
}) {
  if (!(await isDatabaseReady())) return null;
  return prisma.review.create({
    data: {
      targetType: input.targetType,
      targetId: input.targetId,
      targetName: sanitizePlainText(input.targetName, 160),
      rating: input.rating,
      title: input.title ? sanitizePlainText(input.title, 120) : null,
      body: sanitizePlainText(input.body, 2000),
      photos: input.photos ?? [],
      authorId: input.authorId,
      authorName: sanitizePlainText(input.authorName, 80),
      authorEmail: input.authorEmail,
      status: input.status ?? "draft",
    },
  });
}

export async function listReviews(filters?: {
  targetType?: string;
  targetId?: string;
  status?: "draft" | "published" | "archived";
}) {
  if (!(await isDatabaseReady())) return null;
  return prisma.review.findMany({
    where: {
      ...(filters?.targetType
        ? { targetType: filters.targetType as "destination" | "cafe" | "guide" | "community" }
        : {}),
      ...(filters?.targetId ? { targetId: filters.targetId } : {}),
      ...(filters?.status ? { status: filters.status } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  message: string;
}) {
  if (!(await isDatabaseReady())) return null;
  return prisma.contactMessage.create({
    data: {
      name: sanitizePlainText(input.name, 80),
      email: input.email.toLowerCase(),
      message: sanitizePlainText(input.message, 4000),
      status: "queued",
    },
  });
}

export async function toggleBookmark(input: {
  userId: string;
  targetType: "destination" | "cafe" | "guide" | "community";
  targetId: string;
  targetSlug?: string;
}) {
  if (!(await isDatabaseReady())) return null;
  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_targetType_targetId: {
        userId: input.userId,
        targetType: input.targetType,
        targetId: input.targetId,
      },
    },
  });
  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return { bookmarked: false };
  }
  await prisma.bookmark.create({
    data: {
      userId: input.userId,
      targetType: input.targetType,
      targetId: input.targetId,
      targetSlug: input.targetSlug,
    },
  });
  return { bookmarked: true };
}

export async function listBookmarks(userId: string) {
  if (!(await isDatabaseReady())) return null;
  return prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleLike(input: {
  userId: string;
  targetType: "destination" | "cafe" | "guide" | "community" | "comment";
  targetId: string;
}) {
  if (!(await isDatabaseReady())) return null;
  const existing = await prisma.like.findUnique({
    where: {
      userId_targetType_targetId: {
        userId: input.userId,
        targetType: input.targetType,
        targetId: input.targetId,
      },
    },
  });
  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  }
  await prisma.like.create({ data: input });
  return { liked: true };
}

export async function toggleFollow(followerId: string, followingId: string) {
  if (!(await isDatabaseReady())) return null;
  if (followerId === followingId) return { following: false };
  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });
  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
    return { following: false };
  }
  await prisma.follow.create({ data: { followerId, followingId } });
  return { following: true };
}

export async function listTrips(userId: string) {
  if (!(await isDatabaseReady())) return null;
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createTrip(input: {
  userId: string;
  title: string;
  destination?: string;
  payload: Record<string, unknown>;
  isPublic?: boolean;
}) {
  if (!(await isDatabaseReady())) return null;
  const shareSlug = input.isPublic ? `trip-${crypto.randomUUID().slice(0, 8)}` : null;
  return prisma.trip.create({
    data: {
      userId: input.userId,
      title: sanitizePlainText(input.title, 160),
      destination: input.destination,
      payload: toJson(input.payload),
      isPublic: Boolean(input.isPublic),
      shareSlug,
    },
  });
}

export async function updateTrip(
  userId: string,
  tripId: string,
  patch: Partial<{
    title: string;
    destination: string;
    payload: Record<string, unknown>;
    isPublic: boolean;
  }>,
) {
  if (!(await isDatabaseReady())) return null;
  const existing = await prisma.trip.findFirst({ where: { id: tripId, userId } });
  if (!existing) return null;
  return prisma.trip.update({
    where: { id: tripId },
    data: {
      ...(patch.title ? { title: sanitizePlainText(patch.title, 160) } : {}),
      ...(patch.destination !== undefined ? { destination: patch.destination } : {}),
      ...(patch.payload ? { payload: toJson(patch.payload) } : {}),
      ...(patch.isPublic !== undefined
        ? {
            isPublic: patch.isPublic,
            shareSlug: patch.isPublic
              ? existing.shareSlug ?? `trip-${crypto.randomUUID().slice(0, 8)}`
              : existing.shareSlug,
          }
        : {}),
    },
  });
}

export async function deleteTrip(userId: string, tripId: string) {
  if (!(await isDatabaseReady())) return null;
  await prisma.trip.deleteMany({ where: { id: tripId, userId } });
  return { ok: true };
}

export async function getTripByShareSlug(shareSlug: string) {
  if (!(await isDatabaseReady())) return null;
  return prisma.trip.findFirst({
    where: { shareSlug, isPublic: true },
  });
}

export async function globalSearch(q: string, limit = 20) {
  if (!(await isDatabaseReady())) return null;
  const query = q.trim();
  if (!query) {
    return { destinations: [], cafes: [], guides: [], community: [], users: [] };
  }

  const [destinations, cafes, guides, community, users] = await Promise.all([
    prisma.destination.findMany({
      where: {
        status: "published",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { searchText: { contains: query.toLowerCase() } },
        ],
      },
      take: limit,
      select: { id: true, slug: true, name: true, countryName: true, cityName: true, summary: true },
    }),
    prisma.cafe.findMany({
      where: {
        status: "published",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { searchText: { contains: query.toLowerCase() } },
        ],
      },
      take: limit,
      select: { id: true, slug: true, name: true, cityName: true, countryName: true, summary: true },
    }),
    prisma.guide.findMany({
      where: {
        status: "published",
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { searchText: { contains: query.toLowerCase() } },
        ],
      },
      take: limit,
      select: { id: true, slug: true, title: true, authorName: true, excerpt: true },
    }),
    prisma.communityPost.findMany({
      where: {
        status: "published",
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { searchText: { contains: query.toLowerCase() } },
        ],
      },
      take: limit,
      select: { id: true, slug: true, title: true, authorName: true, excerpt: true },
    }),
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
      select: { id: true, name: true, image: true, role: true },
    }),
  ]);

  return { destinations, cafes, guides, community, users };
}

export async function createMediaAsset(input: {
  title: string;
  url: string;
  alt?: string;
  mimeType?: string;
  sizeBytes?: number;
  folder?: string;
  provider?: "url" | "supabase" | "local";
  storagePath?: string;
  uploadedById?: string;
}) {
  if (!(await isDatabaseReady())) return null;
  return prisma.mediaAsset.create({
    data: {
      title: sanitizePlainText(input.title, 120),
      url: input.url,
      alt: input.alt ? sanitizePlainText(input.alt, 200) : null,
      mimeType: input.mimeType ?? "image/jpeg",
      sizeBytes: input.sizeBytes ?? 0,
      folder: input.folder ?? "uploads",
      provider: input.provider ?? "url",
      storagePath: input.storagePath,
      uploadedById: input.uploadedById,
    },
  });
}

export async function listMediaAssets(q = "", page = 1, pageSize = 24) {
  if (!(await isDatabaseReady())) return null;
  const where = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { alt: { contains: q, mode: "insensitive" as const } },
          { folder: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};
  const [total, items] = await Promise.all([
    prisma.mediaAsset.count({ where }),
    prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);
  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
