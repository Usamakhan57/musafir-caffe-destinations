import { SectionHeading } from "@/shared/ui";

import type { Review } from "../types";
import { RatingStars } from "./rating-stars";

interface ReviewsSectionProps {
  reviews: readonly Review[];
  rating: number;
  reviewCount: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          id="reviews-heading"
          eyebrow="Reviews"
          title="What travelers are saying"
          align="left"
        />
        <div className="flex items-center gap-2 text-coffee-700">
          <RatingStars rating={rating} size="md" />
          <span className="text-sm font-medium">
            {rating.toFixed(1)} &middot; {reviewCount} reviews
          </span>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li
            key={`${review.author}-${review.date}`}
            className="flex flex-col gap-3 rounded-2xl border border-cream-200 bg-white p-5"
          >
            <RatingStars rating={review.rating} />
            <p className="text-sm leading-relaxed text-coffee-700">&ldquo;{review.comment}&rdquo;</p>
            <div className="mt-auto pt-2 text-xs text-coffee-500">
              <span className="font-semibold text-coffee-800">{review.author}</span>
              <span> &middot; {review.location}</span>
              <span> &middot; {formatDate(review.date)}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
