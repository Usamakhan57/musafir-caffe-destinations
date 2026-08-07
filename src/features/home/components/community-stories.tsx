"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { testimonials } from "../data/content";
import { HomeSectionHeader } from "./home-section-header";

const ease = [0.22, 1, 0.36, 1] as const;

export function CommunityStories() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="community-stories-heading"
      className="bg-[#FAFAF9] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <FadeIn>
          <div id="community-stories-heading">
            <HomeSectionHeader
              eyebrow="Community Stories"
              title="Loved by travelers worldwide"
              description="Honest notes from photographers, nomads, and coffee lovers who use MusafirCaffe to find their next table."
              action={
                <Link
                  href={ROUTES.community}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition hover:gap-3"
                >
                  Join community
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
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <motion.article
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, transition: { duration: 0.35, ease } }
                }
                className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_48px_-30px_rgba(15,118,110,0.25)] sm:p-8"
              >
                <Quote className="h-8 w-8 text-[#14B8A6]/50" aria-hidden />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[#111827]">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-4 border-t border-[#E5E7EB] pt-6">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#0F766E]/15">
                    <Image
                      src={t.avatar}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-[#111827]">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
