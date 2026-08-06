import Image from "next/image";
import Link from "next/link";

import { cafeRoute } from "@/constants";

import type { CafeSummary } from "../types";

interface CafeCardProps {
  cafe: CafeSummary;
  priority?: boolean;
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  return (
    <Link href={cafeRoute(cafe.slug)} className="group block h-full">
      <article className="card-hover img-zoom relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={cafe.heroImage}
            alt={`${cafe.name}, ${cafe.city} — ${cafe.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/10 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-coffee-800 shadow-sm backdrop-blur-sm">
            {cafe.countryFlag} {cafe.country}
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-gold-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {cafe.rating.toFixed(1)} ★
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            <span>{cafe.category}</span>
            <span>{cafe.priceLevel}</span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-coffee-900">{cafe.name}</h3>
            <p className="mt-1 text-sm text-coffee-500">{cafe.city}</p>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-coffee-600">{cafe.description}</p>

          <div className="mt-auto flex items-center justify-between border-t border-cream-200/80 pt-3 text-sm text-coffee-600">
            <span>{cafe.openingHours}</span>
            <span>{cafe.reviewCount} reviews</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
