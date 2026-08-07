import Link from "next/link";

import { destinationRoute } from "@/constants";
import { getDestinationBySlug } from "@/features/destinations/data/destinations-loader";

interface RelatedDestinationsSectionProps {
  slugs: readonly string[];
}

export async function RelatedDestinationsSection({ slugs }: RelatedDestinationsSectionProps) {
  if (slugs.length === 0) return null;

  const destinations = await Promise.all(slugs.map((slug) => getDestinationBySlug(slug)));
  const related = destinations.filter((destination): destination is NonNullable<typeof destination> => Boolean(destination));

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-destinations-heading">
      <h2 id="related-destinations-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
        Related destinations
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {related.map((destination) => (
          <Link key={destination.slug} href={destinationRoute(destination.slug)} className="rounded-2xl border border-cream-200/80 bg-cream-50 p-5 shadow-card transition-colors hover:border-forest-400">
            <p className="font-semibold text-coffee-900">{destination.name}</p>
            <p className="mt-1 text-sm text-coffee-500">{destination.country}</p>
            <p className="mt-3 text-sm leading-relaxed text-coffee-600">{destination.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
