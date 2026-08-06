interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}

/** Renders a row of 5 stars, filled proportionally to `rating` (0–5). */
export function RatingStars({ rating, size = "sm", className }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const dimension = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className ?? ""}`}
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fillPercent = Math.max(0, Math.min(1, clamped - index)) * 100;
        return (
          <span key={index} className={`relative ${dimension}`} aria-hidden>
            <svg viewBox="0 0 20 20" className={`${dimension} text-cream-300`} fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span
              className="absolute inset-0 overflow-hidden text-gold-500"
              style={{ width: `${fillPercent}%` }}
            >
              <svg viewBox="0 0 20 20" className={`${dimension}`} fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
