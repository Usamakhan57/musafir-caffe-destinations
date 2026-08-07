import "server-only";

import { createReviewRecord, listReviews } from "@/server/db";

import type { PublicReviewInput, PublicReviewRecord } from "./schemas";

export type { PublicReviewInput, PublicReviewRecord } from "./schemas";
export { publicReviewSchema } from "./schemas";

const fallback: PublicReviewRecord[] = [];

export async function createPublicReview(
  input: PublicReviewInput,
): Promise<PublicReviewRecord> {
  const row = await createReviewRecord({
    targetType: input.targetType,
    targetId: input.targetId,
    targetName: input.targetName,
    rating: input.rating,
    title: input.title,
    body: input.body,
    photos: input.photos,
    authorName: input.authorName,
    authorEmail: input.authorEmail,
    status: "draft",
  });

  if (row) {
    return {
      ...input,
      id: row.id,
      status: "pending",
      createdAt: row.createdAt.toISOString(),
    };
  }

  const record: PublicReviewRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  fallback.unshift(record);
  return record;
}

export async function listPublicReviews(targetType?: string, targetId?: string) {
  const rows = await listReviews({
    targetType,
    targetId,
  });
  if (rows) {
    return rows.map((row) => ({
      id: row.id,
      targetType: row.targetType as PublicReviewInput["targetType"],
      targetId: row.targetId,
      targetName: row.targetName,
      rating: row.rating,
      title: row.title ?? "",
      body: row.body,
      authorName: row.authorName,
      authorEmail: row.authorEmail ?? undefined,
      photos: row.photos,
      status:
        row.status === "draft"
          ? ("pending" as const)
          : row.status === "published"
            ? ("published" as const)
            : ("rejected" as const),
      createdAt: row.createdAt.toISOString(),
    }));
  }

  return fallback.filter((review) => {
    if (targetType && review.targetType !== targetType) return false;
    if (targetId && review.targetId !== targetId) return false;
    return true;
  });
}

export async function averageRating(targetType: string, targetId: string) {
  const items = await listPublicReviews(targetType, targetId);
  const published = items.filter((r) => r.status === "published");
  if (published.length === 0) return null;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / published.length, count: published.length };
}
