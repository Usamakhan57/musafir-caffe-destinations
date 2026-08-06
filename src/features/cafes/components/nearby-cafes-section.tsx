import Link from "next/link";

import { cafeRoute } from "@/constants";

import type { CafeDetail } from "../types";

interface NearbyCafesSectionProps {
  cafes: readonly CafeDetail[];
}

export function NearbyCafesSection({ cafes }: NearbyCafesSectionProps) {
  if (cafes.length === 0) return null;

  return (
    <section aria-labelledby="nearby-cafes-heading">
      <h2 id="nearby-cafes-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
        Nearby cafés
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cafes.map((cafe) => (
          <Link key={cafe.slug} href={cafeRoute(cafe.slug)} className="rounded-2xl border border-cream-200/80 bg-cream-50 p-5 shadow-card transition-colors hover:border-forest-400">
            <p className="font-semibold text-coffee-900">{cafe.name}</p>
            <p className="mt-1 text-sm text-coffee-500">{cafe.city}, {cafe.country}</p>
            <p className="mt-3 text-sm leading-relaxed text-coffee-600">{cafe.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
