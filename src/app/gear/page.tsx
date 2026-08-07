import { ROUTES } from "@/constants";
import { CommerceCatalog, gearOffers } from "@/features/monetization";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Coffee Gear",
  description:
    "Travel pour-over kits, grinders, and café-ready gear with affiliate partner links.",
  path: ROUTES.gear,
});

export default function GearPage() {
  return (
    <CommerceCatalog
      eyebrow="Coffee gear"
      title="Brew well between hotel rooms and overnight trains."
      description="Packable gear picks for travelers who refuse bad hotel coffee — partner links disclosed."
      breadcrumbLabel="Coffee Gear"
      path={ROUTES.gear}
      offers={gearOffers}
      ctaTitle="Upgrade your kit"
      ctaDescription="Connoisseur members unlock gear affiliate boosts and creator toolkit perks."
    />
  );
}
