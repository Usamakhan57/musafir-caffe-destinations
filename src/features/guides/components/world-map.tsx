import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading } from "@/shared/ui";

export default function WorldMap() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Discover"
        title="Find guides by region with a global overview"
        description="Navigate the most inspiring travel stories, cafés, and local tips mapped across continents."
        align="left"
      />

      <div className="mt-10 rounded-3xl bg-white p-4 shadow-card sm:p-6">
        <div className="relative h-56 w-full overflow-hidden rounded-[28px] sm:h-80 lg:h-[28rem]">
          <Image
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop"
            alt="Aerial view suggesting a global map of travel destinations"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-coffee-600">
            Browse our most popular regions and uncover guides for every coffee-loving traveler.
          </p>
          <Link
            href={ROUTES.destinations}
            className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            Explore regions
          </Link>
        </div>
      </div>
    </section>
  );
}
