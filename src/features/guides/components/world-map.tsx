import Image from "next/image";
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

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-card">
        <div className="relative h-[28rem] w-full overflow-hidden rounded-[28px]">
          <Image
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop"
            alt="Global travel map"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl text-sm leading-6 text-coffee-600">
            Browse our most popular regions and uncover guides for every coffee-loving traveler.
          </p>
          <button className="rounded-2xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">
            Explore regions
          </button>
        </div>
      </div>
    </section>
  );
}
