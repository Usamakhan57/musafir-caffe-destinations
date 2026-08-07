import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";

export function DestinationsListingHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#111827] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1800&q=80"
          alt="Traveler overlooking a scenic destination skyline at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(17,24,39,0.88) 0%, rgba(15,118,110,0.55) 55%, rgba(17,24,39,0.75) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[320px] max-w-7xl flex-col justify-end px-5 py-14 sm:min-h-[380px] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#99F6E4]">
          Destinations
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
          Coffee cities, cultural capitals, and places worth lingering.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Filter by continent, budget, season, and coffee culture — then open a destination built for travelers who measure journeys in cups.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={ROUTES.cafes}
            className="inline-flex h-11 items-center justify-center rounded-[16px] bg-white px-5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#FAFAF9]"
          >
            Browse cafés
          </Link>
          <Link
            href={ROUTES.digitalNomads}
            className="inline-flex h-11 items-center justify-center rounded-[16px] border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Nomad hubs
          </Link>
        </div>
      </div>
    </section>
  );
}
