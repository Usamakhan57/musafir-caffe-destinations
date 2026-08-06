import Image from "next/image";

import { FadeIn, StaggerContainer, StaggerItem } from "@/shared/ui";

import { instagramPosts } from "../data/content";

export function InstagramGallery() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-forest-600">
              <span aria-hidden className="h-px w-8 bg-forest-500" />
              @musafircaffe
              <span aria-hidden className="h-px w-8 bg-forest-500" />
            </span>
            <h2 className="font-serif text-3xl leading-tight font-semibold text-coffee-900 sm:text-4xl">
              Follow the Journey
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-coffee-600">
              Snapshots from our community of travelers — captured between sips and sunsets.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Full-width gallery */}
      <StaggerContainer
        className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
        staggerDelay={0.08}
      >
        {instagramPosts.map((post) => (
          <StaggerItem key={post.alt}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.67vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-coffee-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-cream-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
