import Image from "next/image";
import Link from "next/link";

import { destinationRoute } from "@/constants";

import type { DestinationSummary } from "../types";

interface DestinationCardProps {
  destination: DestinationSummary;
  priority?: boolean;
}

export function DestinationCard({ destination, priority = false }: DestinationCardProps) {
  return (
    <Link href={destinationRoute(destination.slug)} className="group block h-full">
      <article className="card-hover img-zoom relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-card">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.country} — ${destination.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/10 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-coffee-800 shadow-sm backdrop-blur-sm">
            <span aria-hidden>{destination.countryFlag}</span>
            <span>{destination.country}</span>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{destination.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            {destination.category}
          </span>
          <h3 className="font-serif text-xl font-semibold text-coffee-900">{destination.name}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-coffee-600">
            {destination.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3 text-xs text-coffee-500">
            <span>{destination.cafesCount} cafés</span>
            <span>{destination.priceLevel}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
