import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { destinations } from "../data/content";

export function FeaturedDestinations() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Popular Destinations"
              title="Coffee Towns Worth the Journey"
              description="Cities where coffee isn't just a drink — it's a way of life, a ritual, and the best reason to book a ticket."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {destinations.map((dest, idx) => (
            <StaggerItem key={dest.name}>
              <Link href={ROUTES.destinations} className="group block">
                <article
                  className={`card-hover img-zoom relative overflow-hidden rounded-2xl bg-cream-50 shadow-card ${
                    idx === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      idx === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country} — ${dest.signature}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/20 to-transparent" />

                    {/* Country flag badge */}
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-coffee-800 shadow-sm backdrop-blur-sm">
                      <span>{dest.countryFlag}</span>
                      <span>{dest.country}</span>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gold-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{dest.rating}</span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-serif text-2xl font-semibold text-cream-50">
                        {dest.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream-200/85">
                        {dest.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cream-300/80">
                          <span
                            aria-hidden
                            className="inline-block h-1.5 w-1.5 rounded-full bg-forest-400"
                          />
                          {dest.signature}
                        </span>
                        <span className="text-xs font-medium text-cream-300/60">
                          {dest.cafes} cafés
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href={ROUTES.destinations}
              className="group inline-flex items-center gap-2 rounded-full border border-forest-600/30 px-7 py-3 text-sm font-semibold text-forest-700 transition-all hover:border-forest-600 hover:bg-forest-50"
            >
              View all destinations
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
