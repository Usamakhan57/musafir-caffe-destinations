import Link from "next/link";

import { FadeIn } from "@/shared/ui";
import { ROUTES } from "@/constants";

const cards = [
  {
    label: "Countries",
    title: "Global havens for modern travelers",
    description: "Curated destinations with premium stays, cultural depth, and seamless logistics.",
    href: ROUTES.destinations,
  },
  {
    label: "Top Cafés",
    title: "Iconic cafés in the world's greatest cities",
    description: "From refined espresso bars to historic salons, every spot is handpicked for quality.",
    href: ROUTES.cafes,
  },
  {
    label: "Travel Guides",
    title: "Editorial intelligence for every journey",
    description: "Rich narratives, local secrets, and elegant itineraries crafted by travel experts.",
    href: ROUTES.guides,
  },
  {
    label: "Experiences",
    title: "Moments designed to feel unforgettable",
    description: "Signature adventures that blend authenticity, comfort, and effortless discovery.",
    href: ROUTES.community,
  },
];

export function PremiumCards() {
  return (
    <section className="bg-[#F8FAFF] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#2563EB]">Featured pillars</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl">
              Four ways we elevate your next escape.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6B7280]">
              A distinguished travel platform built for the curious and the discerning — where each journey is composed with care, clarity, and premium detail.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, idx) => (
            <FadeIn key={card.label} delay={0.08 * idx}>
              <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_90px_-42px_rgba(15,23,42,0.22)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#2563EB]">
                    {card.label}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#2563EB] text-sm font-semibold">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl font-semibold text-[#111827]">
                  {card.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#6B7280]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-all duration-300 group-hover:translate-x-1"
                >
                  Explore more
                  <span aria-hidden>→</span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
