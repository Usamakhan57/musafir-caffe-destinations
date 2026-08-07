"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/shared/ui";

import { stats } from "../data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroStats() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Platform statistics"
      className="border-y border-[#0F4C5C]/08 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-14 lg:px-12">
        <FadeIn>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.08 * idx, ease }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.04, transition: { duration: 0.3, ease } }
                }
                className="text-center lg:text-left"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <p className="font-serif text-3xl font-semibold tracking-tight text-[#0F4C5C] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#6B7280] sm:text-[15px]">
                    {stat.label}
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
