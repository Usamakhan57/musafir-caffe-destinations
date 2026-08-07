"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { destinations } from "../data/content";
import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

export function FeaturedDestinations() {
  const prefersReducedMotion = useReducedMotion();
  const featured = destinations.slice(0, 6);

  return (
    <section
      aria-labelledby="featured-destinations-heading"
      className="bg-[#FAFAF9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <HomeSectionHeader
            id="featured-destinations-heading"
            eyebrow="Featured Destinations"
            title="Coffee towns worth the journey"
            description="Curated cities where café culture, atmosphere, and local rituals make every cup a reason to travel."
            action={
              <Link
                href={ROUTES.destinations}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition hover:gap-3"
              >
                View all
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            }
          />
        </FadeIn>

        <StaggerContainer
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {featured.map((dest) => (
            <StaggerItem key={dest.name}>
              <motion.article
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, transition: { duration: 0.35, ease } }
                }
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_18px_50px_-30px_rgba(15,118,110,0.28)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/55 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
                    <span aria-hidden>{dest.countryFlag}</span>
                    {dest.country}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl font-semibold text-[#111827]">
                      {dest.name}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#0F766E]/8 px-2 py-1 text-xs font-bold text-[#0F766E]">
                      ★ {dest.rating}
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-[#6B7280]">
                    <MapPin className="h-3.5 w-3.5 text-[#14B8A6]" aria-hidden />
                    {dest.country} · {dest.cafes} cafés
                  </p>

                  <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                    {dest.description}
                  </p>

                  <Link
                    href={ROUTES.destinations}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d5f59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
