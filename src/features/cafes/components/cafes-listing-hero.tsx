import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";

export function CafesListingHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#111827] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80"
          alt="Barista preparing specialty coffee in a sunlit café"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(17,24,39,0.9) 0%, rgba(15,118,110,0.55) 55%, rgba(17,24,39,0.8) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[300px] max-w-7xl flex-col justify-end px-5 py-14 sm:min-h-[360px] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#99F6E4]">Cafés</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
          Specialty bars, historic salons, and nomad-friendly tables worldwide.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Filter by coffee type, amenities, and vibe — then explore menus, scores, and neighborhoods worth lingering in.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={ROUTES.destinations}
            className="inline-flex h-11 items-center justify-center rounded-[16px] bg-white px-5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#FAFAF9]"
          >
            Browse destinations
          </Link>
          <Link
            href={ROUTES.digitalNomads}
            className="inline-flex h-11 items-center justify-center rounded-[16px] border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            Nomad cafés
          </Link>
        </div>
      </div>
    </section>
  );
}
