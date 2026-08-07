"use client";

import Link from "next/link";
import {
  Coffee,
  Laptop,
  Users,
  Wifi,
  Building2,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars: ReadonlyArray<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Coworking",
    description: "Quiet corners and long-stay tables built for focus.",
    icon: Building2,
  },
  {
    title: "Fast Internet",
    description: "Verified Wi‑Fi speeds so your standup never drops.",
    icon: Wifi,
  },
  {
    title: "Remote Work",
    description: "Power outlets, calm lighting, and all-day friendly spots.",
    icon: Laptop,
  },
  {
    title: "Coffee",
    description: "Specialty pours that keep you sharp between sessions.",
    icon: Coffee,
  },
  {
    title: "Community",
    description: "Meet other nomads over espresso and shared tables.",
    icon: Users,
  },
];

export function DigitalNomad() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="digital-nomad-heading"
      className="relative overflow-hidden border-y border-[#E5E7EB] bg-[#0F766E] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(20,184,166,0.45), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(245,158,11,0.22), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <FadeIn direction="left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#99F6E4]">
              Digital Nomad
            </p>
            <h2
              id="digital-nomad-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Work from the world&apos;s best cafés
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-teal-50/85 sm:text-lg">
              Find remote-friendly cafés with reliable Wi‑Fi, power, and the
              kind of atmosphere that makes deep work feel easy.
            </p>
            <Link
              href={ROUTES.digitalNomads}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0F766E] transition hover:bg-[#FAFAF9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore the nomad hub
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </FadeIn>

          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.07}
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem
                  key={pillar.title}
                  className={idx === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}
                >
                  <motion.article
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -6, scale: 1.02, transition: { duration: 0.3, ease } }
                    }
                    className="h-full rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-teal-50/80">
                      {pillar.description}
                    </p>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
