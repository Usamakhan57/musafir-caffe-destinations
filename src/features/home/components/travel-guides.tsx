"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { guides } from "../data/content";
import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

export function TravelGuides() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="travel-guides-heading"
      className="border-y border-[#E5E7EB] bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div id="travel-guides-heading">
            <HomeSectionHeader
              eyebrow="Top Travel Guides"
              title="Editorial notes for every itinerary"
              description="Culture, etiquette, and café-first routes written by travelers who drink the coffee and walk the streets."
              action={
                <Link
                  href={ROUTES.guides}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition hover:gap-3"
                >
                  All guides
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              }
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {guides.map((guide, idx) => (
            <StaggerItem key={guide.title}>
              <motion.article
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, transition: { duration: 0.35, ease } }
                }
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] shadow-[0_18px_50px_-32px_rgba(15,118,110,0.28)] ${
                  idx === 0 ? "lg:col-span-1" : ""
                }`}
              >
                <Link href={ROUTES.guides} className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={guide.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#0F766E] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      {guide.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl font-semibold leading-snug text-[#111827] transition group-hover:text-[#0F766E]">
                      {guide.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#6B7280]">
                      {guide.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-4 text-xs font-medium text-[#6B7280]">
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden />
                        {guide.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden />
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
