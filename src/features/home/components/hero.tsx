"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

const POPULAR_DESTINATIONS = [
  { label: "Istanbul", href: ROUTES.destinations },
  { label: "Kyoto", href: ROUTES.destinations },
  { label: "Melbourne", href: ROUTES.destinations },
  { label: "Lisbon", href: ROUTES.destinations },
  { label: "Bali", href: ROUTES.destinations },
] as const;

const FLOATING_FEATURES = [
  {
    icon: "☕",
    title: "Cafe Directory",
    description: "Handpicked cafés in every city you visit.",
    accent: "#0F4C5C",
    delay: 0.15,
    className: "lg:top-4 lg:left-0 xl:left-6",
  },
  {
    icon: "🌍",
    title: "Global Destinations",
    description: "Curated coffee towns across six continents.",
    accent: "#2E8B57",
    delay: 0.25,
    className: "lg:top-0 lg:right-0 xl:right-4",
  },
  {
    icon: "⭐",
    title: "Verified Reviews",
    description: "Trusted notes from travelers who've been there.",
    accent: "#D4A017",
    delay: 0.35,
    className: "lg:bottom-24 lg:left-4 xl:left-10",
  },
  {
    icon: "💻",
    title: "Remote Work Friendly",
    description: "Wi‑Fi, outlets, and calm spaces to get work done.",
    accent: "#0F4C5C",
    delay: 0.45,
    className: "lg:bottom-16 lg:right-2 xl:right-8",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [destination, setDestination] = useState("");
  const [country, setCountry] = useState("all");
  const [category, setCategory] = useState("cafes");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    // Presentational search bar — same non-navigating behavior as before.
    event.preventDefault();
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#FCFAF7]"
    >
      {/* Soft atmospheric gradient — no photo, no overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(15,76,92,0.07), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(212,160,23,0.08), transparent 50%), radial-gradient(ellipse 60% 40% at 70% 90%, rgba(46,139,87,0.06), transparent 45%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 lg:px-12 lg:pb-20 lg:pt-16 xl:gap-16">
        {/* ── Left column ── */}
        <div className="relative z-10 flex flex-col">
          <FadeIn direction="up" delay={0}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0F4C5C]/15 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0F4C5C] shadow-[0_8px_24px_-16px_rgba(15,76,92,0.35)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#2E8B57]"
              />
              Travel · Coffee · Community
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.08}>
            <h1
              id="hero-heading"
              className="mt-6 max-w-[18ch] font-serif text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem]"
            >
              Discover the world through coffee &amp; local places
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.14}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#6B7280] sm:text-lg sm:leading-8">
              MusafirCaffe connects travelers with inspiring destinations, café
              discoveries, and guides written by people who linger over every cup.
            </p>
          </FadeIn>

          {/* Large search */}
          <FadeIn direction="up" delay={0.2} className="mt-8 sm:mt-10">
            <form
              onSubmit={handleSearch}
              className="rounded-2xl border border-[#0F4C5C]/10 bg-white p-2 shadow-[0_24px_60px_-28px_rgba(15,76,92,0.28)] sm:p-2.5"
              role="search"
              aria-label="Search destinations and cafés"
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
                <div className="min-w-0 flex-1">
                  <label htmlFor="hero-destination" className="sr-only">
                    Destination
                  </label>
                  <input
                    id="hero-destination"
                    name="destination"
                    type="search"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where are you headed?"
                    className="h-12 w-full rounded-xl border border-transparent bg-[#FCFAF7] px-4 text-sm text-[#111827] outline-none transition focus:border-[#0F4C5C]/30 focus:bg-white focus:ring-2 focus:ring-[#0F4C5C]/15 sm:h-14 sm:text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:min-w-0">
                  <div className="min-w-0 sm:w-[140px]">
                    <label htmlFor="hero-country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="hero-country"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="h-12 w-full appearance-none rounded-xl border border-transparent bg-[#FCFAF7] px-4 text-sm text-[#111827] outline-none transition focus:border-[#0F4C5C]/30 focus:bg-white focus:ring-2 focus:ring-[#0F4C5C]/15 sm:h-14"
                    >
                      <option value="all">All countries</option>
                      <option value="tr">Türkiye</option>
                      <option value="jp">Japan</option>
                      <option value="au">Australia</option>
                      <option value="pt">Portugal</option>
                      <option value="id">Indonesia</option>
                    </select>
                  </div>

                  <div className="min-w-0 sm:w-[130px]">
                    <label htmlFor="hero-category" className="sr-only">
                      Category
                    </label>
                    <select
                      id="hero-category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-12 w-full appearance-none rounded-xl border border-transparent bg-[#FCFAF7] px-4 text-sm text-[#111827] outline-none transition focus:border-[#0F4C5C]/30 focus:bg-white focus:ring-2 focus:ring-[#0F4C5C]/15 sm:h-14"
                    >
                      <option value="cafes">Cafés</option>
                      <option value="destinations">Destinations</option>
                      <option value="guides">Guides</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-[#0F4C5C] px-6 text-sm font-semibold text-white transition duration-300 hover:bg-[#0c3d4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C5C] sm:h-14 sm:px-8"
                >
                  Search
                </button>
              </div>
            </form>
          </FadeIn>

          {/* Popular destinations */}
          <FadeIn direction="up" delay={0.28} className="mt-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Popular
              </span>
              {POPULAR_DESTINATIONS.map((dest) => (
                <Link
                  key={dest.label}
                  href={dest.href}
                  className="rounded-full border border-[#0F4C5C]/12 bg-white px-3.5 py-1.5 text-sm font-medium text-[#111827] transition duration-300 hover:-translate-y-0.5 hover:border-[#0F4C5C]/30 hover:text-[#0F4C5C] hover:shadow-[0_10px_24px_-16px_rgba(15,76,92,0.45)]"
                >
                  {dest.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Right column: floating feature cards (no image) ── */}
        <div className="relative z-10 min-h-[420px] sm:min-h-[460px] lg:min-h-[520px]">
          {/* Desktop absolute float layout */}
          <div className="absolute inset-0 hidden lg:block">
            {FLOATING_FEATURES.map((feature) => (
              <motion.article
                key={feature.title}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 28, scale: 0.96 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: feature.delay, ease }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, scale: 1.03, transition: { duration: 0.35, ease } }
                }
                className={`absolute w-[min(100%,280px)] rounded-2xl border border-[#0F4C5C]/08 bg-white p-5 shadow-[0_28px_60px_-32px_rgba(15,76,92,0.35)] ${feature.className}`}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${feature.accent}14` }}
                  aria-hidden
                >
                  {feature.icon}
                </div>
                <p className="mt-4 font-serif text-lg font-semibold text-[#111827]">
                  {feature.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {feature.description}
                </p>
                <div
                  className="mt-4 h-1 w-10 rounded-full"
                  style={{ backgroundColor: feature.accent }}
                  aria-hidden
                />
              </motion.article>
            ))}
          </div>

          {/* Tablet / mobile stacked grid */}
          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:hidden"
            staggerDelay={0.1}
          >
            {FLOATING_FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.article
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -6, scale: 1.02, transition: { duration: 0.3, ease } }
                  }
                  className="h-full rounded-2xl border border-[#0F4C5C]/08 bg-white p-5 shadow-[0_20px_48px_-28px_rgba(15,76,92,0.3)]"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: `${feature.accent}14` }}
                    aria-hidden
                  >
                    {feature.icon}
                  </div>
                  <p className="mt-4 font-serif text-lg font-semibold text-[#111827]">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

export default Hero;
