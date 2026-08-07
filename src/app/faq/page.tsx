import Link from "next/link";

import { ROUTES } from "@/constants";
import { ContentCta, MarketingHero, ProseSection } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about MusafirCaffe — accounts, destinations, cafés, guides, and community features.",
  path: ROUTES.faq,
});

const faqs = [
  {
    q: "What is MusafirCaffe?",
    a: "MusafirCaffe is a travel platform focused on destinations, café culture, and community guides. Think of it as a meeting place for curious travelers — part guidebook, part café map, part social table.",
  },
  {
    q: "Is MusafirCaffe free to use?",
    a: "Browsing destinations, cafés, and guides is free. Creating an account unlocks wishlist, trip planning, and community features. Join Free to get started.",
  },
  {
    q: "How do I find cafés with reliable wifi?",
    a: "Open Cafés and filter for work-friendly spaces, or explore Digital Nomads for city tips on cafés that welcome longer stays.",
  },
  {
    q: "Can I contribute a guide or café tip?",
    a: "Yes. Join the Community, share stories, and contact us if you’d like to collaborate on a destination guide.",
  },
  {
    q: "How do I reset my password?",
    a: "Use Forgot Password on the Sign In page. You’ll receive a secure link to set a new password.",
  },
  {
    q: "Where can I get more help?",
    a: "Visit the Help Center for step-by-step articles, or Contact us if you need a human reply.",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="FAQ"
        title="Questions travelers ask before the next cup."
        description="Straight answers about browsing, accounts, and how MusafirCaffe helps you explore coffee cities with confidence."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <ProseSection eyebrow="Answers" title="Frequently asked questions">
        <div className="mx-auto max-w-3xl divide-y divide-[#E5E7EB] rounded-[24px] border border-[#E5E7EB] bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-5 sm:px-7">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-[#111827] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-1 text-[#0F766E] transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-[15px]">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[#6B7280]">
          Still stuck?{" "}
          <Link href={ROUTES.help} className="font-semibold text-[#0F766E] hover:underline">
            Visit the Help Center
          </Link>{" "}
          or{" "}
          <Link href={ROUTES.contact} className="font-semibold text-[#0F766E] hover:underline">
            contact us
          </Link>
          .
        </p>
      </ProseSection>

      <ContentCta
        title="Start exploring"
        description="Browse destinations and cafés — then join free to save your favorites."
        primaryHref={ROUTES.destinations}
        primaryLabel="Explore destinations"
        secondaryHref={ROUTES.register}
        secondaryLabel="Join free"
      />
    </main>
  );
}
