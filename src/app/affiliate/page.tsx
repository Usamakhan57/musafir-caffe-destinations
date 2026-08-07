import { ROUTES } from "@/constants";
import { affiliatePartners } from "@/features/monetization";
import {
  ContentCard,
  ContentCta,
  ContentGrid,
  MarketingHero,
  ProseSection,
} from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Affiliate Program",
  description:
    "MusafirCaffe affiliate structure for hotels, flights, tours, and coffee gear — tracked partners with editorial firewall.",
  path: ROUTES.affiliate,
});

export default function AffiliatePage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Partners"
        title="Affiliate structure built for trust."
        description="Tracked partner networks for stays, flights, tours, and gear — with clear disclosure and independent editorial scores."
        breadcrumbs={[{ label: "Affiliate" }]}
      />

      <ProseSection
        eyebrow="Networks"
        title="Active partner categories"
        description="Each offer deep-links through a tracking parameter and click API for attribution."
      >
        <ContentGrid columns={2}>
          {affiliatePartners.map((partner) => (
            <ContentCard
              key={partner.id}
              title={partner.name}
              description={`${partner.network} · ${partner.commissionLabel} · ${partner.trackingParam}`}
            />
          ))}
        </ContentGrid>
      </ProseSection>

      <ProseSection eyebrow="How it works" title="Attribution without bias">
        <ContentGrid columns={2}>
          <ContentCard
            title="Click tracking"
            description="POST /api/affiliate/click records partner and offer IDs for reporting."
          />
          <ContentCard
            title="Editorial firewall"
            description="Café and destination rankings never ingest affiliate revenue as a ranking signal."
          />
          <ContentCard
            title="Disclosure"
            description="Commerce pages label partner links and use rel=sponsored on outbound CTAs."
          />
          <ContentCard
            title="Membership lift"
            description="Premium plans can surface priority windows without changing base editorial content."
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title="Explore partner surfaces"
        description="Browse hotels, flights, tours, and gear catalogs wired for affiliate attribution."
        primaryHref={ROUTES.hotels}
        primaryLabel="Browse hotels"
        secondaryHref={ROUTES.contact}
        secondaryLabel="Become a partner"
      />
    </main>
  );
}
