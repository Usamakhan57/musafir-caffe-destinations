import Image from "next/image";
import Link from "next/link";
import { Coffee, Laptop } from "lucide-react";

import { ROUTES } from "@/constants";
import { siteConfig } from "@/config";

import type { DestinationDetail } from "../types";
import { RatingStars } from "./rating-stars";
import { ShareButtons } from "./share-buttons";

interface DestinationHeroProps {
  destination: DestinationDetail;
}

export function DestinationHero({ destination }: DestinationHeroProps) {
  const shareUrl = `${siteConfig.url}/destinations/${destination.slug}`;

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/40 to-[#111827]/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 sm:pb-14 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/70">
            <li>
              <Link href={ROUTES.destinations} className="hover:text-white">
                Destinations
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white" aria-current="page">
              {destination.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {destination.category}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {destination.coffeeCulture}
          </span>
          {destination.digitalNomadFriendly ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F766E]/90 px-3 py-1 text-xs font-semibold text-white">
              <Laptop className="h-3.5 w-3.5" aria-hidden />
              Nomad friendly
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 flex flex-wrap items-center gap-3 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {destination.name}
          <span className="text-2xl font-normal text-white/80 sm:text-3xl">
            {destination.countryFlag} {destination.country}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-white/85">{destination.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white">
          <div className="flex items-center gap-2">
            <RatingStars rating={destination.rating} />
            <span>
              {destination.rating.toFixed(1)} ({destination.reviewCount} reviews)
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5">
            <Coffee className="h-4 w-4 text-[#99F6E4]" aria-hidden />
            Coffee {destination.coffeeScore.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Laptop className="h-4 w-4 text-[#99F6E4]" aria-hidden />
            Nomad {destination.nomadScore.toFixed(1)}
          </span>
          <span>{destination.cafesCount} cafés</span>
          <span>Best: {destination.bestSeason}</span>
          <span>{destination.priceLevel} typical spend</span>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/95 p-3 text-[#111827] backdrop-blur-sm sm:inline-flex">
          <ShareButtons title={`${destination.name}, ${destination.country}`} url={shareUrl} />
        </div>
      </div>
    </section>
  );
}
