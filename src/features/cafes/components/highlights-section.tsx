import type { CafeDetail } from "../types";

interface HighlightsSectionProps {
  cafe: CafeDetail;
}

export function HighlightsSection({ cafe }: HighlightsSectionProps) {
  return (
    <section aria-labelledby="highlights-heading">
      <h2 id="highlights-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
        Why travelers love it
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cafe.highlights.map((highlight) => (
          <div key={highlight} className="rounded-2xl border border-cream-200/80 bg-cream-50 p-5 shadow-card">
            <p className="font-medium text-coffee-800">{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
