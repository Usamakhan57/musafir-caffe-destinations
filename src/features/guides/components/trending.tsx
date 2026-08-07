import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAuthorForGuide, getTrendingGuides } from "../data/guides-store";
import GuideCard from "./guide-card";

export default async function TrendingGuides() {
  const guides = await getTrendingGuides();

  if (guides.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="trending-guides-heading">
      <SectionHeading
        id="trending-guides-heading"
        eyebrow="Trending"
        title="What travelers are reading right now"
        description="Explore the most popular guides, routes, and café collections from our community."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
        {guides.map((guide) => (
          <StaggerItem key={guide.slug}>
            <GuideCard guide={guide} author={getAuthorForGuide(guide)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
