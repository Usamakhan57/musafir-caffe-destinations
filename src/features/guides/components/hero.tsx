import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { FadeIn } from "@/shared/ui";

import { getAllGuides, getGuideFilterOptions } from "../data/guides-store";

export default async function GuidesHero() {
  const guides = await getAllGuides();
  const options = getGuideFilterOptions();

  return (
    <header className="relative overflow-hidden bg-white pt-0">
      <div className="absolute inset-0 h-[560px] sm:h-[640px] lg:h-[720px]">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
          alt="Coastal travel destination with soft morning light — inspiration for coffee-rich journeys"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-coffee-950/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1400px] items-center px-5 py-16 sm:min-h-[640px] sm:px-8 sm:py-20 lg:h-[720px] lg:px-12 lg:py-0">
        <div className="grid w-full gap-10 lg:grid-cols-[55%_45%] lg:gap-12">
          <FadeIn>
            <div className="flex max-w-[620px] flex-col justify-center gap-5 sm:gap-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#2563EB]">
                Guides · Travel · Coffee
              </span>
              <h1 className="font-serif text-4xl leading-[1.05] font-semibold text-white sm:text-5xl md:text-[3.6rem] md:leading-[0.95] lg:text-[4.5rem]">
                Discover coffee-rich journeys, local cafés, and travel stories built for explorers.
              </h1>
              <p className="max-w-[520px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                From city escapes to origin stories, our curated guides connect you to the best
                cafés, neighborhoods, and routes across the world.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="#browse-guides"
                  className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-4 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#1D4ED8]"
                >
                  Browse guides
                </a>
                <Link
                  href={ROUTES.destinations}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/20"
                >
                  Explore destinations
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="absolute -left-12 top-10 h-[420px] w-[420px] rounded-full bg-[#2563EB]/15 blur-3xl" />
              <div className="relative w-full max-w-[720px]">
                <div className="relative h-[560px] w-full overflow-hidden rounded-[32px] shadow-[0_40px_80px_-30px_rgba(2,6,23,0.35)]">
                  <Image
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop"
                    alt="European old town street — coffee travel inspiration"
                    fill
                    sizes="(min-width:1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-8 hidden w-[320px] rounded-[32px] border border-white/15 bg-white/90 p-5 shadow-xl backdrop-blur-xl md:block">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Curated collections
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    {guides.length}+ guides crafted by local travelers across{" "}
                    {options.countries.length} countries.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </header>
  );
}
