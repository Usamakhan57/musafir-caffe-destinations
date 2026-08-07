"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Laptop,
  Leaf,
  Star,
  Trees,
  Wifi,
} from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

import { cafeRoute } from "@/constants";

import type { CafeSummary } from "../types";
import { isCafeOpenNow } from "../data/enrich-cafe";

interface CafeCardProps {
  cafe: CafeSummary;
  priority?: boolean;
}

function bookmarkKey(slug: string) {
  return `musafir:bookmark:cafe:${slug}`;
}

function subscribeBookmarks(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("musafir-cafe-bookmark", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("musafir-cafe-bookmark", onStoreChange);
  };
}

export function CafeCard({ cafe, priority = false }: CafeCardProps) {
  const getBookmark = useCallback(
    () => window.localStorage.getItem(bookmarkKey(cafe.slug)) === "1",
    [cafe.slug],
  );
  const bookmarked = useSyncExternalStore(subscribeBookmarks, getBookmark, () => false);
  const openNow = useSyncExternalStore(
    () => () => undefined,
    () => isCafeOpenNow(cafe),
    () => true,
  );

  function toggleBookmark(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(cafe.slug));
    else window.localStorage.setItem(bookmarkKey(cafe.slug), "1");
    window.dispatchEvent(new Event("musafir-cafe-bookmark"));
  }

  return (
    <article className="card-hover img-zoom group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_18px_44px_-30px_rgba(15,118,110,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={cafeRoute(cafe.slug)} className="absolute inset-0">
          <Image
            src={cafe.heroImage}
            alt={`${cafe.name}, ${cafe.city} — ${cafe.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
        </Link>

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
          {cafe.countryFlag} {cafe.country}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-[#111827] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            {cafe.rating.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={toggleBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark café"}
            aria-pressed={bookmarked}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/95 text-[#0F766E] shadow-sm transition hover:bg-white"
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} aria-hidden />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
              openNow ? "bg-[#0F766E]" : "bg-[#6B7280]"
            }`}
          >
            {openNow ? "Open" : "Closed"}
          </span>
          {cafe.hasWifi ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111827]">
              <Wifi className="h-3 w-3 text-[#0F766E]" aria-hidden />
              WiFi
            </span>
          ) : null}
          {cafe.hasOutdoorSeating ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111827]">
              <Trees className="h-3 w-3 text-[#0F766E]" aria-hidden />
              Outdoor
            </span>
          ) : null}
          {cafe.remoteWorkFriendly ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111827]">
              <Laptop className="h-3 w-3 text-[#0F766E]" aria-hidden />
              Nomad
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
            {cafe.category}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[#111827] transition group-hover:text-[#0F766E]">
            <Link href={cafeRoute(cafe.slug)}>{cafe.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            {cafe.city}, {cafe.country}
          </p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[#6B7280]">{cafe.description}</p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
          <span className="rounded-full bg-[#FAFAF9] px-2.5 py-1 font-semibold text-[#111827]">
            {cafe.priceLevel}
          </span>
          <span>{cafe.reviewCount} reviews</span>
          {cafe.veganOptions ? (
            <span className="inline-flex items-center gap-1">
              <Leaf className="h-3 w-3 text-[#0F766E]" aria-hidden />
              Vegan options
            </span>
          ) : null}
        </div>

        <div className="mt-auto pt-1">
          <Link
            href={cafeRoute(cafe.slug)}
            className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[16px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-4 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37]"
          >
            Explore
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
