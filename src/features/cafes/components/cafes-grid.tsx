import { CafeCard } from "./cafe-card";
import type { CafeSummary } from "../types";

interface CafesGridProps {
  cafes: readonly CafeSummary[];
}

export function CafesGrid({ cafes }: CafesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cafes.map((cafe, index) => (
        <CafeCard key={cafe.slug} cafe={cafe} priority={index < 3} />
      ))}
    </div>
  );
}
