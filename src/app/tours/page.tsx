import { ROUTES } from "@/constants";
import { CommerceCatalog, tourOffers } from "@/features/monetization";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Tours",
  description:
    "Local coffee walks, market tours, and specialty crawls with affiliate-ready booking partners.",
  path: ROUTES.tours,
});

export default function ToursPage() {
  return (
    <CommerceCatalog
      eyebrow="Tours"
      title="Walk the ritual, not just the postcard."
      description="Guided coffee tours and neighborhood crawls from trusted local partners."
      breadcrumbLabel="Tours"
      path={ROUTES.tours}
      offers={tourOffers}
      ctaTitle="Book with confidence"
      ctaDescription="Premium members see priority tour windows and packing checklists."
    />
  );
}
