import { StaggerContainer, StaggerItem, EmptyState } from "@/shared/ui";
import { ROUTES } from "@/constants";

import { CafeCard } from "./cafe-card";
import type { CafeSummary } from "../types";

interface CafesGridProps {
  cafes: readonly CafeSummary[];
}

export function CafesGrid({ cafes }: CafesGridProps) {
  if (cafes.length === 0) {
    return (
      <EmptyState
        variant="cafes"
        actionHref={ROUTES.cafes}
        actionLabel="Browse all cafés"
      />
    );
  }

  return (
    <StaggerContainer
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
      staggerDelay={0.08}
    >
      {cafes.map((cafe, index) => (
        <StaggerItem key={cafe.slug} className="h-full">
          <CafeCard cafe={cafe} priority={index < 3} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
