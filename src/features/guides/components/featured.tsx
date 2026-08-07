import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAuthorForGuide, getFeaturedGuides } from "../data/guides-loader";
import GuideCard from "./guide-card";

export default async function FeaturedGuides() {
  const guides = await getFeaturedGuides();

  if (guides.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="featured-guides-heading">
      <SectionHeading
        id="featured-guides-heading"
        eyebrow="Featured"
        title="Editor-selected routes for your next trip"
        description="These standout guides are curated for immersive coffee travel, local culture, and unforgettable cafés."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" staggerDelay={0.12}>
        {guides.map((guide, index) => (
          <StaggerItem key={guide.slug}>
            <GuideCard
              guide={guide}
              author={getAuthorForGuide(guide)}
              priority={index < 2}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
