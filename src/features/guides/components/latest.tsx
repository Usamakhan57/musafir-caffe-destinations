import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAuthorForGuide, getLatestGuides } from "../data/guides-store";
import GuideCard from "./guide-card";

export default async function LatestGuides() {
  const guides = await getLatestGuides(8);

  if (guides.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="latest-guides-heading">
      <SectionHeading
        id="latest-guides-heading"
        eyebrow="Latest"
        title="Fresh guides added every week"
        description="Stay current with the newest routes, cafés, and stories from our traveling contributors."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" staggerDelay={0.12}>
        {guides.map((guide) => (
          <StaggerItem key={guide.slug}>
            <GuideCard guide={guide} author={getAuthorForGuide(guide)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
