import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { FadeIn } from "@/shared/ui";

export function Hero() {
  return (
    <section className="relative bg-white pt-0 pb-[220px] min-h-[850px] overflow-visible">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 h-[850px]">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Panoramic travel"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto z-20 h-[850px] w-full max-w-[1400px] px-6 lg:px-12">
        <div className="grid h-full w-full grid-cols-1 items-start gap-[70px] lg:grid-cols-[55%_45%]">
          <FadeIn>
            <div className="relative z-30 flex max-w-[620px] flex-col">
              <p className="mt-[20px] text-[10px] uppercase tracking-[0.35em] text-[#2563EB]">Travel · Coffee · Community</p>

              <div className="max-w-[580px]">
                <h1 className="font-serif text-[72px] leading-[1] font-semibold text-white max-w-[580px] mb-[28px]">
                  Discover the world
                  <br />
                  through coffee,
                  <br />
                  stories and
                  <br />
                  local places.
                </h1>
              </div>

              <p className="max-w-[520px] text-[18px] leading-[1.8] text-white/85">
                MusafirCaffe connects travelers, coffee lovers, and communities with inspiring destinations, café discoveries, and travel guides.
              </p>

              <div className="mt-[36px] flex flex-wrap gap-4">
                <Link
                  href={ROUTES.destinations}
                  className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-4 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#1D4ED8]"
                >
                  Explore destinations
                </Link>
                <Link
                  href={ROUTES.cafes}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition duration-300 hover:border-[#2563EB]/50"
                >
                  Browse cafés
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative flex items-center justify-center">
              <div className="relative w-full h-[560px] overflow-visible">
                <div className="absolute -left-12 top-10 h-[420px] w-[420px] rounded-full bg-[#2563EB]/15 blur-3xl" />
                <div className="relative mx-auto w-full max-w-[720px]">
                  <div className="relative h-[560px] w-full overflow-hidden rounded-[32px] shadow-[0_40px_80px_-30px_rgba(2,6,23,0.35)]">
                    <Image
                      src="/images/hero/hero-bg.jpg"
                      alt="Premium scene"
                      width={960}
                      height={560}
                      className="h-full w-full object-cover rounded-[32px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Floating premium horizontal search bar */}
      <div className="absolute left-1/2 bottom-[-150px] z-10 w-[92%] max-w-[1280px] -translate-x-1/2">
        <div className="h-[95px] w-full rounded-[28px] bg-white p-4 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.12)]">
          <div className="flex h-full w-full items-center gap-4">
            <div className="flex h-full min-w-0 flex-1 items-center gap-3">
              <label className="sr-only">Destination</label>
              <input
                className="h-[64px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Destination"
                aria-label="Destination"
              />
            </div>

            <div className="flex h-full min-w-[180px] items-center gap-3">
              <label className="sr-only">Country</label>
              <select className="h-[64px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none">
                <option>All countries</option>
              </select>
            </div>

            <div className="flex h-full min-w-[180px] items-center gap-3">
              <label className="sr-only">Category</label>
              <select className="h-[64px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none">
                <option>Cafés</option>
              </select>
            </div>

            <div className="flex h-full items-center">
              <button className="h-[64px] rounded-xl bg-[#2563EB] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
