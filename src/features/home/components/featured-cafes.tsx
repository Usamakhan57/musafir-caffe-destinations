"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Coffee,
  Sun,
  Wifi,
  Clock,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { cafes } from "../data/content";
import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

/** Presentation-only amenity flags for homepage cafe cards. */
const cafeExtras: Record<
  string,
  { wifi: boolean; outdoor: boolean; openNow: boolean }
> = {
  "Café Central": { wifi: true, outdoor: false, openNow: true },
  "Fuglen Tokyo": { wifi: true, outdoor: false, openNow: true },
  "Café de Flore": { wifi: false, outdoor: true, openNow: true },
  "Tomoca Coffee": { wifi: false, outdoor: false, openNow: true },
  "Blue Bottle Kyoto": { wifi: true, outdoor: true, openNow: false },
  "Pergamino Café": { wifi: true, outdoor: true, openNow: true },
};

function CafeCard({
  cafe,
  prefersReducedMotion,
}: {
  cafe: (typeof cafes)[number];
  prefersReducedMotion: boolean | null;
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const extras = cafeExtras[cafe.name] ?? {
    wifi: true,
    outdoor: false,
    openNow: true,
  };

  return (
    <motion.article
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -8, transition: { duration: 0.35, ease } }
      }
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_18px_50px_-30px_rgba(15,118,110,0.25)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={cafe.image}
          alt={`${cafe.name} in ${cafe.city}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#111827] shadow-sm">
            {cafe.priceLevel}
          </span>
          {extras.openNow ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#0F766E] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <Clock className="h-3 w-3" aria-hidden />
              Open now
            </span>
          ) : (
            <span className="rounded-full bg-[#111827]/70 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Closed
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setBookmarked((v) => !v);
          }}
          aria-label={bookmarked ? `Remove ${cafe.name} from bookmarks` : `Bookmark ${cafe.name}`}
          aria-pressed={bookmarked}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#111827] shadow-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          <Bookmark
            className={`h-4 w-4 ${bookmarked ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`}
            aria-hidden
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#111827]">
              {cafe.name}
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              {cafe.countryFlag} {cafe.city}, {cafe.country}
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#F59E0B]/12 px-2 py-1 text-xs font-bold text-[#B45309]">
            ★ {cafe.rating}
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#6B7280]">
          {cafe.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Amenities">
          {extras.wifi ? (
            <li className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
              <Wifi className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden />
              WiFi
            </li>
          ) : null}
          {extras.outdoor ? (
            <li className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
              <Sun className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden />
              Outdoor
            </li>
          ) : null}
          <li className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#FAFAF9] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
            <Coffee className="h-3.5 w-3.5 text-[#14B8A6]" aria-hidden />
            {cafe.knownFor}
          </li>
        </ul>

        <Link
          href={ROUTES.cafes}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition group-hover:gap-3"
        >
          View café
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}

export function FeaturedCafes() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="trending-cafes-heading"
      className="border-y border-[#E5E7EB] bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div id="trending-cafes-heading">
            <HomeSectionHeader
              eyebrow="Trending Cafés"
              title="Places travelers linger longer"
              description="Specialty counters, historic salons, and neighborhood favorites — rated for coffee, comfort, and remote-friendly stays."
              action={
                <Link
                  href={ROUTES.cafes}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition hover:gap-3"
                >
                  Discover all
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              }
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {cafes.map((cafe) => (
            <StaggerItem key={cafe.name}>
              <CafeCard cafe={cafe} prefersReducedMotion={prefersReducedMotion} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
