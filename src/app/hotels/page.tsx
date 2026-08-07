import { ROUTES } from "@/constants";
import { CommerceCatalog, hotelOffers } from "@/features/monetization";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Hotels",
  description:
    "Boutique hotels and stay partners near great café streets — affiliate-ready booking links with editorial independence.",
  path: ROUTES.hotels,
});

export default function HotelsPage() {
  return (
    <CommerceCatalog
      eyebrow="Hotels"
      title="Stay near the cafés you came for."
      description="Partner stays curated around walkability, quiet work corners, and morning espresso rituals."
      breadcrumbLabel="Hotels"
      path={ROUTES.hotels}
      offers={hotelOffers}
      ctaTitle="Travel smarter with Nomad"
      ctaDescription="Premium members unlock offline packs and prioritized stay recommendations."
    />
  );
}
