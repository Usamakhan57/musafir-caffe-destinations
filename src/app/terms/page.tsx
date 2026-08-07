import { ROUTES } from "@/constants";
import { ContentCta, MarketingHero, ProseSection } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing your use of MusafirCaffe destinations, cafés, guides, community features, and related services.",
  path: ROUTES.terms,
});

const sections = [
  {
    title: "Acceptance",
    body: "By accessing MusafirCaffe, you agree to these Terms. If you do not agree, please do not use the service.",
  },
  {
    title: "Accounts",
    body: "You are responsible for safeguarding your credentials and for activity under your account. Provide accurate information and notify us of unauthorized use.",
  },
  {
    title: "Content & community",
    body: "Guides, stories, and comments should be respectful, lawful, and honest. We may remove content that harms others, misrepresents places, or violates these Terms.",
  },
  {
    title: "Intellectual property",
    body: "MusafirCaffe branding, product design, and curated datasets remain our property. You retain rights to content you submit, and grant us a license to display it on the platform.",
  },
  {
    title: "Disclaimers",
    body: "Destination and café information is provided for inspiration and planning. Always verify opening hours, visas, and local guidance before you travel.",
  },
  {
    title: "Contact",
    body: "Questions about these Terms? Email legal@musafircaffe.com or use our Contact page.",
  },
] as const;

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The ground rules for using MusafirCaffe — written clearly so travelers and partners know what to expect."
        breadcrumbs={[{ label: "Terms" }]}
      />

      <ProseSection eyebrow="Terms" title="Using MusafirCaffe" description="Last updated: August 2026">
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
        title="Need clarification?"
        description="We’re happy to explain how these terms apply to partnerships, café listings, or community contributions."
        primaryHref={ROUTES.contact}
        primaryLabel="Contact us"
        secondaryHref={ROUTES.privacy}
        secondaryLabel="Privacy policy"
      />
    </main>
  );
}
