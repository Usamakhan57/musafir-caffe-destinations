import { ROUTES } from "@/constants";
import { ContentCta, MarketingHero, ProseSection } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how MusafirCaffe collects, uses, and protects your personal information when you use our travel platform.",
  path: ROUTES.privacy,
});

const sections = [
  {
    title: "Information we collect",
    body: "When you create an account, we collect details you provide such as name, email, and profile preferences. We also collect usage data (pages visited, device type) to improve search, recommendations, and performance.",
  },
  {
    title: "How we use information",
    body: "We use your information to operate MusafirCaffe, personalize destinations and café suggestions, communicate important account updates, and keep the community safe. We do not sell your personal data.",
  },
  {
    title: "Cookies & analytics",
    body: "We use cookies and similar technologies for authentication, preferences, and analytics. See our Cookies page for more detail and choices.",
  },
  {
    title: "Sharing",
    body: "We may share data with trusted service providers who help us host, authenticate, or analyze the product — under contracts that protect your information. We may disclose information if required by law.",
  },
  {
    title: "Your choices",
    body: "You can update profile information, request access or deletion, and opt out of non-essential marketing emails. Contact privacy@musafircaffe.com for privacy requests.",
  },
  {
    title: "Updates",
    body: "We may update this policy as MusafirCaffe grows. Significant changes will be reflected on this page with a revised date.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your trust matters. This policy explains what we collect, why we collect it, and the choices you have while exploring MusafirCaffe."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <ProseSection eyebrow="Policy" title="How we handle your data" description="Last updated: August 2026">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((section) => (
            <article key={section.title}>
              <h3 className="font-serif text-xl font-semibold text-[#111827]">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-[15px] sm:leading-7">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </ProseSection>

      <ContentCta
        title="Questions about privacy?"
        description="Reach our team and we’ll walk you through how your data is used."
        primaryHref={ROUTES.contact}
        primaryLabel="Contact us"
        secondaryHref={ROUTES.cookies}
        secondaryLabel="Cookie policy"
      />
    </main>
  );
}
