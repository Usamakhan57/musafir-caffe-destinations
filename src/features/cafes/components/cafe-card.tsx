import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";

import { cafeRoute } from "@/constants";

import type { CafeSummary } from "../types";

interface CafeCardProps {
  cafe: CafeSummary;
  priority?: boolean;
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  return (
    <Link
      href={cafeRoute(cafe.slug)}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
    >
      <article className="card-hover img-zoom relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.25)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={cafe.heroImage}
            alt={`${cafe.name}, ${cafe.city} — ${cafe.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/65 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
            {cafe.countryFlag} {cafe.country}
          </div>

          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-[#111827] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            {cafe.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
            <span>{cafe.category}</span>
            <span className="rounded-full bg-[#FAFAF9] px-2 py-0.5 text-[#6B7280] normal-case tracking-normal">
              {cafe.priceLevel}
            </span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#111827] transition group-hover:text-[#0F766E]">
              {cafe.name}
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">{cafe.city}</p>
          </div>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#6B7280]">
            {cafe.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-[#E5E7EB] pt-3 text-sm text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden />
              {cafe.openingHours}
            </span>
            <span>{cafe.reviewCount} reviews</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
