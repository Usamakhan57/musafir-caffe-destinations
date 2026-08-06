import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading, FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { communityStories } from "../data/content";

export function CommunityStories() {
  return (
    <section className="border-t border-cream-200 bg-cream-100/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex justify-center">
            <SectionHeading
              eyebrow="Community Stories"
              title="Tales From the Road"
              description="Real stories from real travelers — moments of connection, discovery, and the unexpected magic of coffee culture."
            />
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-8 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {communityStories.map((story) => (
            <StaggerItem key={story.title}>
              <Link href={ROUTES.community} className="group block h-full">
                <article className="card-hover img-zoom flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-cream-50">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/50 to-transparent" />

                    {/* Location badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-coffee-700 shadow-sm backdrop-blur-sm">
                      <svg
                        className="h-3.5 w-3.5 text-forest-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      {story.location}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-serif text-xl leading-snug font-semibold text-coffee-900 transition-colors group-hover:text-forest-700">
                      {story.title}
                    </h3>

                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-coffee-500">
                      {story.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-cream-200 pt-4">
                      <span className="text-xs font-medium text-coffee-400">
                        By {story.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-coffee-300">
                        <svg
                          className="h-3.5 w-3.5 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {story.likes}
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
