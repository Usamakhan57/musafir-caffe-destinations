import Image from "next/image";

import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { testimonials } from "../data/content";

export function Testimonials() {
  return (
    <section className="border-t border-cream-200 bg-cream-100/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by Travelers Worldwide"
              description="Hear from the community that's redefining how the world discovers coffee."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-8 lg:grid-cols-3"
          staggerDelay={0.15}
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="card-hover flex h-full flex-col rounded-2xl border border-cream-200/80 bg-cream-50 p-8 shadow-card">
                {/* Quote mark */}
                <svg
                  className="mb-4 h-8 w-8 text-forest-300/60"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>

                <blockquote className="flex-1 text-base leading-relaxed text-coffee-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-4 border-t border-cream-200 pt-6">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-coffee-900">{t.name}</p>
                    <p className="text-xs text-coffee-400">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
