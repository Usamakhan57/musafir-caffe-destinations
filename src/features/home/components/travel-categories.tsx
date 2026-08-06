import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { categories } from "../data/content";

export function TravelCategories() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Explore by Category"
              title="Find Your Kind of Café"
              description="Whether you're chasing rooftop sunsets, hunting for hidden gems, or need reliable WiFi — we've mapped it."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {categories.map((cat) => (
            <StaggerItem key={cat.name}>
              <Link href={ROUTES.guides} className="group block">
                <div className="card-hover flex items-center gap-5 rounded-2xl border border-cream-200/80 bg-cream-50 p-6 shadow-sm">
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest-100 to-forest-50 text-2xl transition-transform group-hover:scale-110">
                    {cat.icon}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-coffee-900 transition-colors group-hover:text-forest-700">
                        {cat.name}
                      </h3>
                      <span className="shrink-0 text-xs font-medium text-coffee-300">
                        {cat.count.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-coffee-500">
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="h-5 w-5 shrink-0 text-cream-300 transition-all group-hover:translate-x-1 group-hover:text-forest-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
