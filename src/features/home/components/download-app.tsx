"use client";

import { Apple, Play, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/shared/ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function DownloadApp() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="download-app-heading"
      className="border-t border-[#E5E7EB] bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              Mobile app
            </p>
            <h2
              id="download-app-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#111827] sm:text-4xl"
            >
              Take MusafirCaffe with you
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#6B7280] sm:text-lg sm:leading-8">
              Save cafés, follow destinations, and get AI travel ideas on the
              go — designed for explorers and digital nomads.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#111827] px-5 py-3.5 text-white transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                aria-label="Download on the App Store"
              >
                <Apple className="h-6 w-6" aria-hidden />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-white/70">
                    Download on the
                  </span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3.5 text-[#111827] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                aria-label="Get it on Google Play"
              >
                <Play className="h-6 w-6 fill-[#0F766E] text-[#0F766E]" aria-hidden />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-[#6B7280]">
                    Get it on
                  </span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative mx-auto flex max-w-md items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-8 rounded-full bg-[#14B8A6]/15 blur-3xl"
              />
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.35, ease } }
                }
                className="relative w-[240px] rounded-[2rem] border border-[#E5E7EB] bg-[#111827] p-3 shadow-[0_40px_80px_-30px_rgba(17,24,39,0.55)] sm:w-[280px]"
                aria-hidden
              >
                <div className="overflow-hidden rounded-[1.5rem] bg-[#FAFAF9]">
                  <div className="flex items-center justify-between bg-[#0F766E] px-4 py-5 text-white">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-teal-100">
                        MusafirCaffe
                      </p>
                      <p className="mt-1 font-serif text-lg font-semibold">Nearby cafés</p>
                    </div>
                    <Smartphone className="h-5 w-5 text-teal-100" />
                  </div>
                  <div className="space-y-3 p-4">
                    {["Kyoto pour-over", "Vienna melange", "Lisbon terrace"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 shadow-sm"
                        >
                          <p className="text-sm font-semibold text-[#111827]">{item}</p>
                          <p className="mt-1 text-xs text-[#6B7280]">
                            Open now · WiFi · 4.8★
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
