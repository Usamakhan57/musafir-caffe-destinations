import { ROUTES } from "@/constants";
import { ContentCta, MarketingHero, ProseSection } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "Cookies",
  description:
    "How MusafirCaffe uses cookies and similar technologies to keep you signed in, remember preferences, and improve the product.",
  path: ROUTES.cookies,
});

const sections = [
  {
    title: "Essential cookies",
    body: "Required for authentication, security, and core navigation. These cannot be disabled if you want to use account features.",
  },
  {
    title: "Preference cookies",
    body: "Remember settings such as language hints and UI preferences so returning visits feel familiar.",
  },
  {
    title: "Analytics cookies",
    body: "Help us understand which destinations, cafés, and guides are most useful so we can improve discovery and performance.",
  },
  {
    title: "Your controls",
    body: "Most browsers let you block or delete cookies. Note that blocking essential cookies may limit Sign In and Dashboard features.",
  },
] as const;

export default function CookiesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Legal"
        title="Cookie Policy"
        description="A clear look at the cookies MusafirCaffe uses — and how you can manage them."
        breadcrumbs={[{ label: "Cookies" }]}
      />

      <ProseSection eyebrow="Cookies" title="What we use and why" description="Last updated: August 2026">
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
        title="More about your data"
        description="Read our Privacy Policy for the full picture of how information is collected and protected."
        primaryHref={ROUTES.privacy}
        primaryLabel="Privacy policy"
        secondaryHref={ROUTES.contact}
        secondaryLabel="Contact us"
      />
    </main>
  );
}
