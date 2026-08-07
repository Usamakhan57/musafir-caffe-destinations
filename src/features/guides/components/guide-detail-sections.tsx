import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { CafeCard, type CafeSummary } from "@/features/cafes";
import { DestinationCard, type DestinationSummary } from "@/features/destinations";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAuthorForGuide } from "../data/guides-store";
import type { GuideDetail } from "../types";
import GuideCard from "./guide-card";

export function GuideGallery({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="guide-gallery-heading">
      <h2
        id="guide-gallery-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Image gallery
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function NearbyCafesFromGuide({ cafes }: { cafes: readonly CafeSummary[] }) {
  if (cafes.length === 0) return null;

  return (
    <section aria-labelledby="nearby-cafes-heading">
      <SectionHeading
        id="nearby-cafes-heading"
        eyebrow="Cafés"
        title="Nearby cafés"
        description="Stops worth booking a table for while you’re in the area."
        align="left"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </section>
  );
}

export function NearbyDestinationsFromGuide({
  destinations,
}: {
  destinations: readonly DestinationSummary[];
}) {
  if (destinations.length === 0) return null;

  return (
    <section aria-labelledby="nearby-destinations-heading">
      <SectionHeading
        id="nearby-destinations-heading"
        eyebrow="Destinations"
        title="Nearby destinations"
        description="Extend the trip with places that pair well with this guide."
        align="left"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </section>
  );
}

export function RelatedGuidesSection({ guides }: { guides: readonly GuideDetail[] }) {
  if (guides.length === 0) return null;

  return (
    <section aria-labelledby="related-guides-heading" className="mt-4">
      <SectionHeading
        id="related-guides-heading"
        eyebrow="Keep reading"
        title="Related guides"
        description="More routes and coffee stories travelers love after this one."
        align="left"
      />
      <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
        {guides.map((guide) => (
          <StaggerItem key={guide.slug}>
            <GuideCard guide={guide} author={getAuthorForGuide(guide)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function BackToGuidesLink() {
  return (
    <div className="border-t border-slate-200 pt-10">
      <Link
        href={ROUTES.guides}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-[#2563EB] transition hover:border-[#2563EB]/40"
      >
        ← Back to Guides
      </Link>
    </div>
  );
}
