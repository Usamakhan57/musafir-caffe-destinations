import { ROUTES } from "@/constants";
import { MembershipCheckout } from "@/features/monetization/components/membership-checkout";
import {
  ContentCta,
  MarketingHero,
  ProseSection,
} from "@/shared/components";
import { JsonLd } from "@/shared/components/json-ld";
import { createPageMetadata } from "@/shared/lib/seo";
import { faqPageJsonLd } from "@/shared/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Premium Membership",
  description:
    "Upgrade to Nomad or Connoisseur for offline packs, AI planner priority, and affiliate travel perks. Payment-ready checkout architecture.",
  path: ROUTES.membership,
});

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans can be canceled from Billing. Yearly plans renew unless canceled before the renewal date.",
  },
  {
    q: "Is payment live today?",
    a: "Checkout is payment-provider ready. Without STRIPE_SECRET_KEY, intents are issued in mock mode for safe staging.",
  },
] as const;

export default function MembershipPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <MarketingHero
        eyebrow="Membership"
        title="Premium travel tools without the noise."
        description="Choose Explorer free, or unlock Nomad and Connoisseur for offline packs, planner priority, and partner perks."
        breadcrumbs={[{ label: "Membership" }]}
      />

      <ProseSection eyebrow="Plans" title="Simple pricing for curious travelers">
        <MembershipCheckout />
      </ProseSection>

      <ProseSection eyebrow="FAQ" title="Membership questions">
        <div className="mx-auto max-w-3xl divide-y divide-[#E5E7EB] rounded-[24px] border border-[#E5E7EB] bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-5 sm:px-7">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-[#111827] marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{item.a}</p>
            </details>
          ))}
        </div>
      </ProseSection>

      <ContentCta
        title="Manage billing anytime"
        description="Signed-in members can review invoices and plan status in the dashboard."
        primaryHref={ROUTES.dashboardBilling}
        primaryLabel="Open billing"
        secondaryHref={ROUTES.affiliate}
        secondaryLabel="Partner program"
      />
    </main>
  );
}
