import Image from "next/image";

import { RatingStars } from "@/features/destinations";

import type { CafeDetail } from "../types";

interface CafeHeroProps {
  cafe: CafeDetail;
}

export function CafeHero({ cafe }: CafeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-coffee-950 text-cream-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_42%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-10 lg:px-12 lg:py-28">
        <div className="relative z-10 flex flex-col justify-center">
          <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cream-200">
            {cafe.category}
          </span>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{cafe.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream-200/90">{cafe.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-cream-200">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
              <RatingStars rating={cafe.rating} size="md" className="text-gold-500" />
              <span className="font-semibold text-cream-50">{cafe.rating.toFixed(1)}</span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">{cafe.reviewCount} reviews</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">{cafe.priceLevel}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-cream-200">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="font-semibold text-cream-50">{cafe.city}</p>
              <p>{cafe.country}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="font-semibold text-cream-50">Opening hours</p>
              <p>{cafe.openingHours}</p>
            </div>
          </div>

        </div>

        <div className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 shadow-elevated">
          <Image
            src={cafe.heroImage}
            alt={`${cafe.name} interior and atmosphere`}
            width={900}
            height={650}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
