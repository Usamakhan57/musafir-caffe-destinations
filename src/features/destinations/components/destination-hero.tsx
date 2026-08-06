import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";

import type { DestinationDetail } from "../types";
import { RatingStars } from "./rating-stars";

interface DestinationHeroProps {
  destination: DestinationDetail;
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src={destination.heroImage}
          alt={`${destination.name}, ${destination.country} — ${destination.tagline}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/85 via-coffee-950/35 to-coffee-950/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-medium text-cream-200/70">
            <li>
              <Link href={ROUTES.destinations} className="hover:text-cream-50">
                Destinations
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-cream-100" aria-current="page">
              {destination.name}
            </li>
          </ol>
        </nav>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream-100 backdrop-blur-sm">
          {destination.category}
        </span>

        <h1 className="mt-4 flex flex-wrap items-center gap-3 font-serif text-4xl font-bold text-cream-50 sm:text-5xl lg:text-6xl">
          {destination.name}
          <span className="text-2xl font-normal text-cream-200/80 sm:text-3xl">
            {destination.countryFlag} {destination.country}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-cream-200/85">{destination.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream-100">
          <div className="flex items-center gap-2">
            <RatingStars rating={destination.rating} />
            <span>
              {destination.rating.toFixed(1)} ({destination.reviewCount} reviews)
            </span>
          </div>
          <span aria-hidden className="hidden h-4 w-px bg-cream-200/30 sm:block" />
          <span>{destination.cafesCount} cafés</span>
          <span aria-hidden className="hidden h-4 w-px bg-cream-200/30 sm:block" />
          <span>Best season: {destination.bestSeason}</span>
          <span aria-hidden className="hidden h-4 w-px bg-cream-200/30 sm:block" />
          <span>{destination.priceLevel} typical spend</span>
        </div>
      </div>
    </section>
  );
}
