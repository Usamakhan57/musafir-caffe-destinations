import Link from "next/link";
import { Backpack, Coffee, MapPinned, Sun } from "lucide-react";

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
  title: "Travel Tips",
  description:
    "Practical travel tips from MusafirCaffe — packing lighter, finding great cafés, and exploring cities like a local.",
  path: ROUTES.travelTips,
});

export default function TravelTipsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Resources"
        title="Travel tips that fit in a daypack — and a coffee cup."
        description="Field notes for curious travelers: how to arrive soft-footed, find the right café table, and turn a short stay into a story worth telling."
        breadcrumbs={[{ label: "Travel Tips" }]}
        actions={
          <Link
            href={ROUTES.guides}
            className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Browse guides
          </Link>
        }
      />

      <ProseSection
        eyebrow="Field notes"
        title="Essentials before you go"
        description="Small habits that make every coffee city feel more welcoming."
      >
        <ContentGrid>
          <ContentCard
            icon={<Backpack className="h-5 w-5" aria-hidden />}
            title="Pack for the café day"
            description="A light layer, a charged battery, and space for a local pastry. Leave room for what the city offers — not what catalogs sell."
          />
          <ContentCard
            icon={<Coffee className="h-5 w-5" aria-hidden />}
            title="Learn the local coffee ritual"
            description="Espresso standing at the bar in Rome, bunna ceremony in Ethiopia, filter drip in Melbourne — matching the ritual unlocks better hospitality."
            href={ROUTES.cafes}
          />
          <ContentCard
            icon={<MapPinned className="h-5 w-5" aria-hidden />}
            title="Neighborhood first"
            description="Pick one district and walk it slowly. Destinations feel richer when you return to the same bakery twice."
            href={ROUTES.destinations}
          />
          <ContentCard
            icon={<Sun className="h-5 w-5" aria-hidden />}
            title="Time your mornings"
            description="Arrive at cafés near opening for quieter tables and fresher service. Save famous spots for golden hour photos later."
          />
        </ContentGrid>
      </ProseSection>

      <ProseSection
        eyebrow="Etiquette"
        title="Be a guest, not a checklist"
        tone="muted"
        description="The best trips leave places better than we found them — quieter sidewalks, fair tips, and curious questions."
      >
        <div className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-[#6B7280] sm:text-[15px] sm:leading-7">
          <p>
            Ask before photographing people. Buy something if you linger with a laptop.
            Learn a greeting in the local language. Support independent cafés when you can —
            they are often the heartbeat of a neighborhood’s welcome.
          </p>
          <p>
            For deeper city playbooks, open our{" "}
            <Link href={ROUTES.guides} className="font-semibold text-[#0F766E] hover:underline">
              Guides
            </Link>{" "}
            or the{" "}
            <Link href={ROUTES.digitalNomads} className="font-semibold text-[#0F766E] hover:underline">
              Digital Nomads
            </Link>{" "}
            hub.
          </p>
        </div>
      </ProseSection>

      <ContentCta
        title="Plan with destinations and cafés"
        description="Save places you love, then build a trip around the tables that feel like yours."
        primaryHref={ROUTES.destinations}
        primaryLabel="Explore destinations"
        secondaryHref={ROUTES.cafes}
        secondaryLabel="Find cafés"
      />
    </main>
  );
}
