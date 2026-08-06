import { StaggerContainer, StaggerItem } from "@/shared/ui";

import type { DestinationSummary } from "../types";
import { DestinationCard } from "./destination-card";

interface DestinationsGridProps {
  destinations: readonly DestinationSummary[];
}

export function DestinationsGrid({ destinations }: DestinationsGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-cream-300 py-20 text-center">
        <span className="font-serif text-xl font-semibold text-coffee-900">
          No destinations match those filters
        </span>
        <p className="max-w-md text-sm text-coffee-600">
          Try clearing a filter or searching a different city, country, or region.
        </p>
      </div>
    );
  }

  return (
    <StaggerContainer
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      staggerDelay={0.08}
    >
      {destinations.map((destination, index) => (
        <StaggerItem key={destination.slug} className="h-full">
          <DestinationCard destination={destination} priority={index < 3} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
