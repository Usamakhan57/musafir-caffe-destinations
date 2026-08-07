import Image from "next/image";
import Link from "next/link";
import { Laptop, Trees, Wifi } from "lucide-react";

import { ROUTES } from "@/constants";
import { siteConfig } from "@/config";
import { RatingStars } from "@/features/destinations";

import type { CafeDetail } from "../types";
import { isCafeOpenNow } from "../data/enrich-cafe";
import { CafeActions } from "./cafe-actions";

interface CafeHeroProps {
  cafe: CafeDetail;
}

export function CafeHero({ cafe }: CafeHeroProps) {
  const shareUrl = `${siteConfig.url}/cafes/${cafe.slug}`;
  const openNow = isCafeOpenNow(cafe);

  return (
    <section className="relative overflow-hidden bg-[#111827] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_42%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
        <div className="relative z-10 flex flex-col justify-center">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/65">
              <li>
                <Link href={ROUTES.cafes} className="hover:text-white">
                  Cafés
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white" aria-current="page">
                {cafe.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
              {cafe.category}
            </span>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                openNow ? "bg-[#0F766E] text-white" : "bg-white/20 text-white"
              }`}
            >
              {openNow ? "Open now" : "Closed"}
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {cafe.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{cafe.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/85">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
              <RatingStars rating={cafe.rating} size="md" className="text-[#F59E0B]" />
              <span className="font-semibold text-white">{cafe.rating.toFixed(1)}</span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
              {cafe.reviewCount} reviews
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
              {cafe.priceLevel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
              {cafe.coffeeType}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {cafe.hasWifi ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <Wifi className="h-3.5 w-3.5" aria-hidden />
                WiFi
              </span>
            ) : null}
            {cafe.hasOutdoorSeating ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <Trees className="h-3.5 w-3.5" aria-hidden />
                Outdoor
              </span>
            ) : null}
            {cafe.remoteWorkFriendly ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <Laptop className="h-3.5 w-3.5" aria-hidden />
                Digital Nomad
              </span>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/85">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="font-semibold text-white">{cafe.city}</p>
              <p>{cafe.country}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <p className="font-semibold text-white">Opening hours</p>
              <p>{cafe.openingHours}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white p-3 text-[#111827]">
            <CafeActions slug={cafe.slug} title={`${cafe.name}, ${cafe.city}`} url={shareUrl} />
          </div>
        </div>

        <div className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
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
