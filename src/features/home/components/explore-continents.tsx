"use client";

import Link from "next/link";
import {
  Earth,
  Landmark,
  Mountain,
  Palmtree,
  Pyramid,
  SunMedium,
  Trees,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

const continents: ReadonlyArray<{
  name: string;
  description: string;
  count: string;
  icon: LucideIcon;
  accent: string;
}> = [
  {
    name: "Asia",
    description: "Kissaten, phin filters, and spice-route cafés.",
    count: "2,400+ cafés",
    icon: Landmark,
    accent: "#0F766E",
  },
  {
    name: "Europe",
    description: "Marble halls, sidewalk terraces, and espresso bars.",
    count: "3,100+ cafés",
    icon: Earth,
    accent: "#14B8A6",
  },
  {
    name: "Africa",
    description: "Origin farms, buna ceremonies, and coastal cities.",
    count: "890+ cafés",
    icon: SunMedium,
    accent: "#F59E0B",
  },
  {
    name: "North America",
    description: "Third-wave hubs and neighborhood coffee culture.",
    count: "1,750+ cafés",
    icon: Trees,
    accent: "#0F766E",
  },
  {
    name: "South America",
    description: "Andean farms, tinto culture, and city roasters.",
    count: "1,200+ cafés",
    icon: Mountain,
    accent: "#14B8A6",
  },
  {
    name: "Australia",
    description: "Laneway flat whites and coastal specialty bars.",
    count: "980+ cafés",
    icon: Palmtree,
    accent: "#F59E0B",
  },
  {
    name: "Middle East",
    description: "Cardamom coffee, majlis culture, and city cafés.",
    count: "640+ cafés",
    icon: Pyramid,
    accent: "#0F766E",
  },
];

export function ExploreContinents() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="explore-continents-heading"
      className="bg-[#FAFAF9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div id="explore-continents-heading">
            <HomeSectionHeader
              eyebrow="Explore by Continent"
              title="A world of coffee maps"
              description="Browse destinations and cafés by region — from origin countries to modern specialty capitals."
              align="center"
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-4"
          staggerDelay={0.06}
        >
          {continents.map((continent) => {
            const Icon = continent.icon;
            return (
              <StaggerItem key={continent.name} className={continent.name === "Middle East" ? "xl:col-start-2" : undefined}>
                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -6, scale: 1.02, transition: { duration: 0.3, ease } }
                  }
                >
                  <Link
                    href={ROUTES.destinations}
                    className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,118,110,0.25)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                    aria-label={`Explore ${continent.name}`}
                  >
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${continent.accent}14`, color: continent.accent }}
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-serif text-xl font-semibold text-[#111827]">
                      {continent.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                      {continent.description}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                      {continent.count}
                    </p>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
