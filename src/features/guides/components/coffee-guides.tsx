import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getAllGuides, getAuthorForGuide } from "../data/guides-store";
import GuideCard from "./guide-card";

export default async function CoffeeGuides() {
  const guides = (await getAllGuides()).filter((guide) => guide.coffeeCulture).slice(0, 4);

  if (guides.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="coffee-guides-heading">
      <SectionHeading
        id="coffee-guides-heading"
        eyebrow="Coffee"
        title="Deep dive guides for the world’s most iconic brews"
        description="Explore origin stories, espresso rituals, and the cafés that shape the coffee landscape."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2" staggerDelay={0.12}>
        {guides.map((guide) => (
          <StaggerItem key={guide.slug}>
            <GuideCard guide={guide} author={getAuthorForGuide(guide)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
