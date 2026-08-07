import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAuthorForGuide, getEditorsPicks } from "../data/guides-store";
import GuideCard from "./guide-card";

export default async function EditorsPicks() {
  const guides = await getEditorsPicks();

  if (guides.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="editors-picks-heading">
      <SectionHeading
        id="editors-picks-heading"
        eyebrow="Editor’s Picks"
        title="Premium routes selected by local travelers"
        description="Hand-picked guides that highlight the most memorable coffee journeys and cultural experiences."
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
