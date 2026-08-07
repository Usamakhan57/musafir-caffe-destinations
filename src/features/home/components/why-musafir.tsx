"use client";

import {
  BadgeCheck,
  BookOpenCheck,
  Globe2,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

const features: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Verified Cafés",
    description:
      "Every listing is reviewed for quality, atmosphere, and traveler usefulness — not just popularity.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Guides",
    description:
      "Editorial itineraries and etiquette notes from people who know the neighborhoods by heart.",
    icon: BookOpenCheck,
  },
  {
    title: "Worldwide Coverage",
    description:
      "From origin farms to capital cities — destinations and cafés mapped across continents.",
    icon: Globe2,
  },
  {
    title: "Travel Community",
    description:
      "Stories, tips, and connections from travelers who meet over coffee and stay for the culture.",
    icon: UsersRound,
  },
];

export function WhyMusafir() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-musafir-heading"
      className="bg-[#FAFAF9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div id="why-musafir-heading">
            <HomeSectionHeader
              eyebrow="Why MusafirCaffe"
              title="Built for curious travelers"
              description="A premium travel platform focused on cafés, destinations, and the communities that make them memorable."
              align="center"
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <motion.article
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -8, scale: 1.02, transition: { duration: 0.35, ease } }
                  }
                  className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_48px_-30px_rgba(15,118,110,0.28)] sm:p-7"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#111827]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
