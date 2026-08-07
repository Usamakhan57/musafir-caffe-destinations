import { StaggerContainer, StaggerItem, EmptyState } from "@/shared/ui";
import { ROUTES } from "@/constants";

import type { DestinationSummary } from "../types";
import { DestinationCard } from "./destination-card";

interface DestinationsGridProps {
  destinations: readonly DestinationSummary[];
}

export function DestinationsGrid({ destinations }: DestinationsGridProps) {
  if (destinations.length === 0) {
    return (
      <EmptyState
        variant="search"
        title="No destinations match those filters"
        description="Try clearing a filter or searching a different city, country, or region."
        actionHref={ROUTES.destinations}
        actionLabel="Clear filters"
      />
    );
  }

  return (
    <StaggerContainer
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
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
