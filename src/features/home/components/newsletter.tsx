"use client";

import { FormEvent } from "react";
import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { FadeIn } from "@/shared/ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function Newsletter() {
  const prefersReducedMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[#FAFAF9] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#0F766E] px-6 py-14 text-center shadow-[0_30px_80px_-40px_rgba(15,118,110,0.55)] sm:px-10 sm:py-16 lg:px-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20,184,166,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(245,158,11,0.2), transparent 50%)",
              }}
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#99F6E4]">
                Newsletter
              </p>
              <h2
                id="newsletter-heading"
                className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl"
              >
                Travel inspiration, delivered weekly
              </h2>
              <p className="mt-4 text-base leading-relaxed text-teal-50/85 sm:text-lg">
                Hidden cafés, destination guides, and community stories — free,
                curated, and easy to unsubscribe anytime.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
                    aria-hidden
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-[#111827] outline-none ring-0 placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#F59E0B] sm:h-14"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#F59E0B] px-6 text-sm font-semibold text-[#111827] transition hover:bg-[#D97706] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:px-8"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
