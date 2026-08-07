"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Coffee, MapPin, Search, Sparkles, Star, Laptop } from "lucide-react";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

const POPULAR_SEARCHES = [
  { label: "Istanbul", href: ROUTES.destinations },
  { label: "Kyoto", href: ROUTES.destinations },
  { label: "Lisbon", href: ROUTES.destinations },
  { label: "Bali", href: ROUTES.destinations },
  { label: "Melbourne", href: ROUTES.destinations },
] as const;

const STATS = [
  { value: "12,000+", label: "Cafés" },
  { value: "180+", label: "Countries" },
  { value: "50k+", label: "Travelers" },
  { value: "4.9★", label: "Rating" },
] as const;

const FLOATING_FEATURES = [
  {
    icon: Coffee,
    title: "Cafe Directory",
    description: "Handpicked specialty cafés with atmosphere and local character.",
    accent: "#6F4E37",
    delay: 0.12,
    floatDelay: 0,
    className: "lg:top-2 lg:left-0 xl:left-4",
  },
  {
    icon: MapPin,
    title: "Global Destinations",
    description: "Coffee towns and cultural capitals across six continents.",
    accent: "#8B6914",
    delay: 0.2,
    floatDelay: 0.6,
    className: "lg:top-0 lg:right-0 xl:right-2",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Trusted notes from travelers who lingered over every cup.",
    accent: "#A67B5B",
    delay: 0.28,
    floatDelay: 1.2,
    className: "lg:bottom-28 lg:left-6 xl:left-12",
  },
  {
    icon: Laptop,
    title: "Digital Nomads",
    description: "Remote-friendly spaces with Wi‑Fi, power, and calm focus.",
    accent: "#5C4033",
    delay: 0.36,
    floatDelay: 1.8,
    className: "lg:bottom-16 lg:right-2 xl:right-6",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [destination, setDestination] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#FAF7F2]"
    >
      {/* Soft cream atmosphere + organic blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 8% 12%, rgba(166,123,91,0.18), transparent 55%), radial-gradient(ellipse 70% 55% at 92% 8%, rgba(139,105,20,0.12), transparent 50%), radial-gradient(ellipse 65% 50% at 78% 88%, rgba(111,78,55,0.14), transparent 52%), radial-gradient(ellipse 50% 40% at 20% 85%, rgba(92,64,51,0.08), transparent 45%)",
        }}
      />

      {/* Decorative blurred coffee blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#A67B5B]/25 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-[#8B6914]/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#6F4E37]/15 blur-3xl"
      />

      {/* Subtle grain/dot pattern — CSS only, no images */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(92,64,51,0.09) 0.75px, transparent 0.75px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-12 lg:px-12 lg:pb-24 lg:pt-20 xl:gap-16">
        {/* ── Left ── */}
        <div className="relative z-10 flex flex-col">
          <FadeIn direction="up" delay={0}>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#6F4E37]/15 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#5C4033] shadow-[0_10px_30px_-18px_rgba(92,64,51,0.45)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#8B6914]" aria-hidden />
              Travel • Coffee • Community
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.08}>
            <h1
              id="hero-heading"
              className="mt-7 max-w-[14ch] font-serif text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-[#2C1810] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]"
            >
              Sip the world, one café at a time
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.14}>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#6B5E55] sm:text-lg sm:leading-8">
              MusafirCaffe is your quiet companion for discovering destinations,
              legendary cafés, and traveler stories — curated with the calm
              elegance of a slow morning abroad.
            </p>
          </FadeIn>

          {/* Destination search */}
          <FadeIn direction="up" delay={0.2} className="mt-8 sm:mt-10">
            <form
              onSubmit={handleSearch}
              role="search"
              aria-label="Search destinations"
              className="rounded-[24px] border border-[#6F4E37]/10 bg-white/75 p-2 shadow-[0_24px_60px_-28px_rgba(92,64,51,0.35)] backdrop-blur-xl sm:p-2.5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <label htmlFor="hero-destination" className="sr-only">
                  Destination
                </label>
                <div className="relative min-w-0 flex-1">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A67B5B]"
                    aria-hidden
                  />
                  <input
                    id="hero-destination"
                    name="destination"
                    type="search"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Search destinations, cities, or cafés…"
                    className="h-12 w-full rounded-[18px] border-0 bg-[#FAF7F2]/80 py-3 pl-11 pr-4 font-sans text-sm text-[#2C1810] outline-none placeholder:text-[#8A7A70] focus:bg-white focus:ring-2 focus:ring-[#A67B5B]/25 sm:h-14 sm:text-[15px]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(111,78,55,0.65)] transition duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37] sm:h-14 sm:px-7"
                >
                  Search
                </button>
              </div>
            </form>
          </FadeIn>

          {/* CTAs */}
          <FadeIn direction="up" delay={0.26} className="mt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={ROUTES.destinations}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(92,64,51,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37] sm:h-14"
              >
                Explore Destinations
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={ROUTES.cafes}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-[#6F4E37]/20 bg-white/70 px-6 text-sm font-semibold text-[#5C4033] shadow-[0_12px_28px_-20px_rgba(92,64,51,0.4)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#6F4E37]/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4E37] sm:h-14"
              >
                Find Cafés
              </Link>
            </div>
          </FadeIn>

          {/* Popular searches */}
          <FadeIn direction="up" delay={0.32} className="mt-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#8A7A70]">
                Popular
              </span>
              {POPULAR_SEARCHES.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-[#6F4E37]/12 bg-white/65 px-3.5 py-1.5 font-sans text-sm font-medium text-[#3D2B22] shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#A67B5B]/40 hover:text-[#6F4E37] hover:shadow-[0_10px_24px_-16px_rgba(111,78,55,0.45)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </FadeIn>

          {/* Statistics */}
          <FadeIn direction="up" delay={0.38} className="mt-10 sm:mt-12">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <p className="font-serif text-2xl font-semibold tracking-tight text-[#2C1810] sm:text-[1.65rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.14em] text-[#8A7A70]">
                      {stat.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* ── Right: floating glass cards ── */}
        <div className="relative z-10 min-h-[440px] sm:min-h-[480px] lg:min-h-[560px]">
          {/* Coffee gradient orbs behind cards */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-[#A67B5B]/30 blur-3xl" />
            <div className="absolute right-[5%] top-[18%] h-44 w-44 rounded-full bg-[#8B6914]/25 blur-3xl" />
            <div className="absolute bottom-[14%] left-[18%] h-36 w-36 rounded-full bg-[#6F4E37]/28 blur-3xl" />
            <div className="absolute bottom-[10%] right-[12%] h-40 w-40 rounded-full bg-[#5C4033]/20 blur-3xl" />
          </div>

          {/* Desktop float layout */}
          <div className="absolute inset-0 hidden lg:block">
            {FLOATING_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: feature.delay, ease }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, -10, 0],
                          transition: {
                            duration: 5.5,
                            delay: feature.floatDelay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                  }
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -14,
                          scale: 1.03,
                          transition: { duration: 0.35, ease },
                        }
                  }
                  className={`absolute w-[min(100%,290px)] rounded-[24px] border border-white/50 bg-white/55 p-5 shadow-[0_28px_60px_-28px_rgba(92,64,51,0.45)] backdrop-blur-xl xl:p-6 ${feature.className}`}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(145deg, ${feature.accent}22, ${feature.accent}10)`,
                      color: feature.accent,
                    }}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-serif text-lg font-semibold text-[#2C1810]">
                    {feature.title}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B5E55]">
                    {feature.description}
                  </p>
                  <div
                    className="mt-4 h-1 w-12 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
                    }}
                    aria-hidden
                  />
                </motion.article>
              );
            })}
          </div>

          {/* Tablet / mobile stack */}
          <StaggerContainer
            className="relative grid gap-4 sm:grid-cols-2 lg:hidden"
            staggerDelay={0.1}
          >
            {FLOATING_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.title}>
                  <motion.article
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -6,
                            scale: 1.02,
                            transition: { duration: 0.3, ease },
                          }
                    }
                    className="h-full rounded-[24px] border border-white/50 bg-white/60 p-5 shadow-[0_22px_48px_-26px_rgba(92,64,51,0.4)] backdrop-blur-xl"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{
                        background: `linear-gradient(145deg, ${feature.accent}22, ${feature.accent}10)`,
                        color: feature.accent,
                      }}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-serif text-lg font-semibold text-[#2C1810]">
                      {feature.title}
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B5E55]">
                      {feature.description}
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

export default Hero;
