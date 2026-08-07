import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getPopularTravelers } from "../data/community-store";
import { TravelerMiniCard } from "./traveler-card";

export async function PopularTravelersSection() {
  const travelers = await getPopularTravelers(6);
  if (travelers.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="popular-travelers-heading">
      <SectionHeading
        id="popular-travelers-heading"
        eyebrow="Popular Travelers"
        title="Meet the travelers shaping our community"
        description="Profiles from around the world who contribute deep local insight and travel expertise."
        align="left"
      />
      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.12}>
        {travelers.map((traveler) => (
          <StaggerItem key={traveler.slug}>
            <TravelerMiniCard traveler={traveler} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
