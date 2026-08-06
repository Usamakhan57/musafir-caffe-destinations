import { SectionHeading } from "@/shared/ui";

import type { DestinationSummary } from "../types";
import { DestinationCard } from "./destination-card";

interface NearbyDestinationsSectionProps {
  destinations: readonly DestinationSummary[];
}

export function NearbyDestinationsSection({ destinations }: NearbyDestinationsSectionProps) {
  if (destinations.length === 0) return null;

  return (
    <section aria-labelledby="nearby-destinations-heading">
      <SectionHeading id="nearby-destinations-heading" eyebrow="Nearby Destinations" title="Keep exploring" align="left" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </section>
  );
}
