import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Laptop, MapPin, Star, Wallet } from "lucide-react";

import { destinationRoute } from "@/constants";

import type { DestinationSummary } from "../types";

interface DestinationCardProps {
  destination: DestinationSummary;
  priority?: boolean;
}

export function DestinationCard({ destination, priority = false }: DestinationCardProps) {
  return (
    <article className="card-hover img-zoom group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_18px_44px_-30px_rgba(15,118,110,0.35)]">
      <Link
        href={destinationRoute(destination.slug)}
        className="relative block aspect-[16/10] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
      >
        <Image
          src={destination.heroImage}
          alt={`${destination.city}, ${destination.country} — ${destination.tagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/15 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
          <span aria-hidden>{destination.countryFlag}</span>
          <span>{destination.country}</span>
        </div>

        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-[#111827] shadow-sm">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
          <span>{destination.rating.toFixed(1)}</span>
        </div>

        {destination.digitalNomadFriendly ? (
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0F766E]/95 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Laptop className="h-3 w-3" aria-hidden />
            Nomad friendly
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            {destination.city}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[#111827] transition group-hover:text-[#0F766E]">
            <Link
              href={destinationRoute(destination.slug)}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
            >
              {destination.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
            <MapPin className="h-3.5 w-3.5 text-[#14B8A6]" aria-hidden />
            {destination.country} · {destination.continent}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
          {destination.description}
        </p>

        <div className="mt-1 grid grid-cols-3 gap-2 rounded-2xl bg-[#FAFAF9] p-3 text-center">
          <div>
            <p className="inline-flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
              <Star className="h-3 w-3 text-[#F59E0B]" aria-hidden />
              Rating
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">
              {destination.rating.toFixed(1)}
              <span className="ml-1 text-xs font-medium text-[#6B7280]">
                ({destination.reviewCount})
              </span>
            </p>
          </div>
          <div>
            <p className="inline-flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
              <Coffee className="h-3 w-3 text-[#0F766E]" aria-hidden />
              Coffee
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">
              {destination.coffeeScore.toFixed(1)}
            </p>
          </div>
          <div>
            <p className="inline-flex items-center justify-center gap-1 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
              <Laptop className="h-3 w-3 text-[#14B8A6]" aria-hidden />
              Nomad
            </p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">
              {destination.nomadScore.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7280]">
            <Wallet className="h-4 w-4 text-[#0F766E]" aria-hidden />
            {destination.budgetLabel}
            <span className="text-[#D1D5DB]">·</span>
            {destination.priceLevel}
          </span>
          <Link
            href={destinationRoute(destination.slug)}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[16px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-4 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(92,64,51,0.55)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37]"
          >
            Explore
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
