import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { destinationRoute } from "@/constants";

import type { DestinationSummary } from "../types";

interface DestinationCardProps {
  destination: DestinationSummary;
  priority?: boolean;
}

export function DestinationCard({ destination, priority = false }: DestinationCardProps) {
  return (
    <Link
      href={destinationRoute(destination.slug)}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
    >
      <article className="card-hover img-zoom relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.25)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.country} — ${destination.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
            <span aria-hidden>{destination.countryFlag}</span>
            <span>{destination.country}</span>
          </div>

          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-[#111827] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            <span>{destination.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            {destination.category}
          </span>
          <h3 className="font-serif text-xl font-semibold text-[#111827] transition group-hover:text-[#0F766E]">
            {destination.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
            {destination.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3 text-xs font-medium text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#14B8A6]" aria-hidden />
              {destination.cafesCount} cafés
            </span>
            <span>{destination.priceLevel}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
