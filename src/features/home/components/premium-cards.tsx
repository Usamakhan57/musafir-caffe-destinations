"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn } from "@/shared/ui";

const cards = [
  {
    label: "01",
    title: "Explore Destinations",
    description:
      "Browse coffee towns and cultural capitals curated for curious travelers.",
    href: ROUTES.destinations,
    accent: "#0F4C5C",
  },
  {
    label: "02",
    title: "Find Cafes",
    description:
      "Discover specialty cafés with atmosphere, Wi‑Fi, and local character.",
    href: ROUTES.cafes,
    accent: "#D4A017",
  },
  {
    label: "03",
    title: "Travel Guides",
    description:
      "Editorial itineraries and etiquette tips from people who know the roads.",
    href: ROUTES.guides,
    accent: "#2E8B57",
  },
  {
    label: "04",
    title: "Community Stories",
    description:
      "Real journeys, shared tables, and friendships sparked over coffee.",
    href: ROUTES.community,
    accent: "#0F4C5C",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function PremiumCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="premium-features-heading"
      className="bg-[#FCFAF7] pb-6 pt-4 sm:pb-8 sm:pt-6"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F4C5C]">
              What you can do
            </p>
            <h2
              id="premium-features-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#111827] sm:text-4xl"
            >
              Everything you need for the next cup abroad
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg">
              Four clear paths into the MusafirCaffe world — destinations, cafés,
              guides, and community.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 sm:mt-12">
          {cards.map((card, idx) => (
            <FadeIn key={card.title} delay={0.06 * idx}>
              <motion.article
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.35, ease },
                      }
                }
                className="group flex h-full flex-col rounded-2xl border border-[#0F4C5C]/08 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,76,92,0.28)] sm:p-7"
              >
                <span
                  className="text-xs font-bold tracking-[0.2em]"
                  style={{ color: card.accent }}
                >
                  {card.label}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#111827] sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6B7280] sm:text-[15px] sm:leading-7">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F4C5C] transition duration-300 group-hover:gap-3"
                >
                  Explore
                  <span aria-hidden>→</span>
                </Link>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
