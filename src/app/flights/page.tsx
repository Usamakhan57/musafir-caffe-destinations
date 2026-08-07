import { ROUTES } from "@/constants";
import { CommerceCatalog, flightOffers } from "@/features/monetization";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Flights",
  description:
    "Flight partner fares for coffee cities and origin trips — transparent affiliate tracking without editorial bias.",
  path: ROUTES.flights,
});

export default function FlightsPage() {
  return (
    <CommerceCatalog
      eyebrow="Flights"
      title="Arrive when the café scene wakes up."
      description="Flexible fares and origin routes selected for travelers who plan days around espresso, not airports."
      breadcrumbLabel="Flights"
      path={ROUTES.flights}
      offers={flightOffers}
      ctaTitle="Pair flights with a membership"
      ctaDescription="Nomad members get planner priority and trip alerts when fares shift."
    />
  );
}
