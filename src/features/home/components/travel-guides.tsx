import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { guides } from "../data/content";

export function TravelGuides() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Featured Guides"
              title="Stories to Fuel Your Next Trip"
              description="Road-tested travel guides, coffee culture deep dives, and itineraries written by real travelers — not algorithms."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-8 lg:grid-cols-3"
          staggerDelay={0.15}
        >
          {guides.map((guide) => (
            <StaggerItem key={guide.title}>
              <Link href={ROUTES.guides} className="group block h-full">
                <article className="card-hover img-zoom flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-cream-50">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/30 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute left-4 top-4 rounded-full bg-forest-600/90 px-3 py-1 text-xs font-semibold text-cream-50 shadow-sm backdrop-blur-sm">
                      {guide.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h3 className="font-serif text-xl leading-snug font-semibold text-coffee-900 transition-colors group-hover:text-forest-700">
                      {guide.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-coffee-500">
                      {guide.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-cream-200 pt-4">
                      <span className="text-xs font-medium text-coffee-400">
                        By {guide.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-forest-600">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
