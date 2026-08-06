import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { cafes } from "../data/content";

export function FeaturedCafes() {
  return (
    <section className="border-t border-cream-200 bg-cream-100/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Trending Cafés"
              title="Tables Where History Was Made"
              description="From Vienna's marble halls to Addis Ababa's standing-room roasters — cafés that shaped cultures and still pour a perfect cup."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {cafes.map((cafe) => (
            <StaggerItem key={cafe.name}>
              <Link href={ROUTES.cafes} className="group block h-full">
                <article className="card-hover img-zoom flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-cream-50 shadow-card">
                  {/* Image */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={cafe.image}
                      alt={`${cafe.name} in ${cafe.city}, ${cafe.country}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Price badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-cream-50/90 px-2.5 py-1 text-xs font-bold text-coffee-700 shadow-sm backdrop-blur-sm">
                      {cafe.priceLevel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-coffee-900 transition-colors group-hover:text-forest-700">
                          {cafe.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-coffee-400">
                          <span>{cafe.countryFlag}</span>
                          {cafe.city}, {cafe.country}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-forest-50 px-2 py-1">
                        <svg
                          className="h-3.5 w-3.5 text-gold-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-bold text-forest-700">{cafe.rating}</span>
                      </div>
                    </div>

                    <p className="line-clamp-2 text-sm leading-relaxed text-coffee-600">
                      {cafe.description}
                    </p>

                    <div className="mt-auto pt-3">
                      <span className="inline-flex rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700">
                        {cafe.knownFor}
                      </span>
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
              href={ROUTES.cafes}
              className="group inline-flex items-center gap-2 rounded-full border border-forest-600/30 px-7 py-3 text-sm font-semibold text-forest-700 transition-all hover:border-forest-600 hover:bg-forest-50"
            >
              Discover all cafés
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
