import Image from "next/image";

import { SectionHeading } from "@/shared/ui";

import type { FeaturedCafe } from "../types";
import { RatingStars } from "./rating-stars";

interface BestCafesSectionProps {
  cafes: readonly FeaturedCafe[];
  destinationName: string;
}

export function BestCafesSection({ cafes, destinationName }: BestCafesSectionProps) {
  if (cafes.length === 0) return null;

  return (
    <section aria-labelledby="best-cafes-heading">
      <SectionHeading
        id="best-cafes-heading"
        eyebrow="Best Cafés"
        title={`Where to drink coffee in ${destinationName}`}
        align="left"
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cafes.map((cafe) => (
          <article
            key={cafe.name}
            className="card-hover overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={cafe.image}
                alt={`${cafe.name} — ${cafe.knownFor}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-coffee-900">{cafe.name}</h3>
                <RatingStars rating={cafe.rating} />
              </div>
              <p className="text-sm leading-relaxed text-coffee-600">{cafe.description}</p>
              <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-forest-100 px-2.5 py-1 text-xs font-medium text-forest-700">
                {cafe.knownFor}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
