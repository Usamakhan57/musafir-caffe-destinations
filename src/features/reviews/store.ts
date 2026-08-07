import { z } from "zod";

export const publicReviewSchema = z.object({
  targetType: z.enum(["destination", "cafe", "guide", "tour", "hotel", "gear"]),
  targetId: z.string().min(1),
  targetName: z.string().min(2).max(160),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().min(2).max(120).optional().default(""),
  body: z.string().min(8).max(2000),
  authorName: z.string().min(2).max(80),
  authorEmail: z.string().email().optional(),
});

export type PublicReviewInput = z.infer<typeof publicReviewSchema>;

export interface PublicReviewRecord extends PublicReviewInput {
  id: string;
  status: "pending" | "published" | "rejected";
  createdAt: string;
}

const reviews: PublicReviewRecord[] = [];

export function createPublicReview(input: PublicReviewInput): PublicReviewRecord {
  const record: PublicReviewRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(record);
  return record;
}

export function listPublicReviews(targetType?: string, targetId?: string) {
  return reviews.filter((review) => {
    if (targetType && review.targetType !== targetType) return false;
    if (targetId && review.targetId !== targetId) return false;
    return true;
  });
}

export function averageRating(targetType: string, targetId: string) {
  const published = reviews.filter(
    (r) =>
      r.targetType === targetType &&
      r.targetId === targetId &&
      r.status === "published",
  );
  if (published.length === 0) return null;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / published.length, count: published.length };
}
