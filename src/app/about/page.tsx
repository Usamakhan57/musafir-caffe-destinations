import Link from "next/link";
import { Compass, Coffee, Globe2, HeartHandshake, Map, Users } from "lucide-react";

import { ROUTES } from "@/constants";
import {
  ContentCard,
  ContentCta,
  ContentGrid,
  MarketingHero,
  ProseSection,
} from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "MusafirCaffe connects travelers, café lovers, and digital nomads through destinations, coffee culture, and community stories from around the world.",
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Our story"
        title="Built for wanderers who measure miles in cups of coffee."
        description="MusafirCaffe began with a simple belief: the best travel advice is shared over a warm cup — in Addis Ababa, Istanbul, Melbourne, or a quiet corner café you haven’t discovered yet."
        breadcrumbs={[{ label: "About Us" }]}
        actions={
          <>
            <Link
              href={ROUTES.community}
              className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(92,64,51,0.7)] transition hover:brightness-110"
            >
              Meet the community
            </Link>
            <Link
              href={ROUTES.contact}
              className="inline-flex h-12 items-center justify-center rounded-[18px] border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#111827] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
            >
              Contact us
            </Link>
          </>
        }
      />

      <ProseSection
        eyebrow="Mission"
        title="Travel smarter. Sip slower. Belong everywhere."
        description="We curate destinations, cafés, and guides so curious travelers can explore with confidence — and leave room for serendipity."
      >
        <ContentGrid>
          <ContentCard
            icon={<Globe2 className="h-5 w-5" aria-hidden />}
            title="Destination intelligence"
            description="City pages that go beyond checklists — neighborhoods, seasons, coffee rituals, and the rhythms that make a place feel lived-in."
            href={ROUTES.destinations}
          />
          <ContentCard
            icon={<Coffee className="h-5 w-5" aria-hidden />}
            title="Café culture first"
            description="From heritage roasters to laptop-friendly hideaways, we map the spaces where travelers actually spend their days."
            href={ROUTES.cafes}
          />
          <ContentCard
            icon={<Map className="h-5 w-5" aria-hidden />}
            title="Guides that travel well"
            description="Road-tested itineraries and tips written like Lonely Planet field notes — practical, vivid, and respectful of local life."
            href={ROUTES.guides}
          />
          <ContentCard
            icon={<Users className="h-5 w-5" aria-hidden />}
            title="A living community"
            description="Stories, meetups, and shared routes from digital nomads and weekenders who believe hospitality is a two-way street."
            href={ROUTES.community}
          />
          <ContentCard
            icon={<Compass className="h-5 w-5" aria-hidden />}
            title="For the long haul"
            description="Whether you stay three days or three months, MusafirCaffe helps you find footing — wifi, ritual, and people who get it."
            href={ROUTES.digitalNomads}
          />
          <ContentCard
            icon={<HeartHandshake className="h-5 w-5" aria-hidden />}
            title="Human by design"
            description="No hollow lists. We prioritize voices on the ground, fair representation, and destinations that welcome visitors thoughtfully."
            href={ROUTES.travelTips}
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title="Ready to plan your next coffee city?"
        description="Browse destinations, save cafés, and join travelers who explore with intention."
        primaryHref={ROUTES.destinations}
        primaryLabel="Explore destinations"
        secondaryHref={ROUTES.register}
        secondaryLabel="Join free"
      />
    </main>
  );
}
