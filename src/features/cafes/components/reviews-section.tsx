import { RatingStars } from "@/features/destinations";
import { ReviewForm } from "@/features/reviews";

import type { CafeDetail } from "../types";

interface ReviewsSectionProps {
  cafe: CafeDetail;
}

export function ReviewsSection({ cafe }: ReviewsSectionProps) {
  return (
    <section aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
        Recent reviews
      </h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {cafe.reviews.map((review) => (
          <article key={`${review.author}-${review.date}`} className="rounded-2xl border border-cream-200/80 bg-cream-50 p-6 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-coffee-900">{review.author}</p>
                <p className="text-sm text-coffee-500">{review.location}</p>
              </div>
              <span className="text-sm font-medium text-coffee-500">{review.date}</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <RatingStars rating={review.rating} />
              <span className="text-sm font-medium text-coffee-700">{review.rating.toFixed(1)}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-coffee-600">{review.comment}</p>
          </article>
        ))}
      </div>
      <ReviewForm targetType="cafe" targetId={cafe.slug} targetName={cafe.name} />
    </section>
  );
}
