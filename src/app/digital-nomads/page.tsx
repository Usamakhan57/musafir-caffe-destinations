import Link from "next/link";
import { Laptop, Wifi, CalendarDays, Coffee } from "lucide-react";

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
  title: "Digital Nomads",
  description:
    "A MusafirCaffe hub for digital nomads — work-friendly cafés, destination rhythms, and community tips for life on the road.",
  path: ROUTES.digitalNomads,
});

export default function DigitalNomadsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Resources"
        title="Work from the world’s best café tables."
        description="For remote workers who want more than coworking beige — cities with rhythm, cafés with character, and a community that understands timezone math."
        breadcrumbs={[{ label: "Digital Nomads" }]}
        actions={
          <>
            <Link
              href={ROUTES.cafes}
              className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Find work-friendly cafés
            </Link>
            <Link
              href={ROUTES.community}
              className="inline-flex h-12 items-center justify-center rounded-[18px] border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#111827] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
            >
              Join community
            </Link>
          </>
        }
      />

      <ProseSection
        eyebrow="Nomad playbook"
        title="What makes a city work"
        description="Look beyond wifi speed — seek neighborhoods with daylight, fair café culture, and evening life that isn’t only nightlife."
      >
        <ContentGrid>
          <ContentCard
            icon={<Wifi className="h-5 w-5" aria-hidden />}
            title="Connectivity with courtesy"
            description="Choose cafés that welcome laptops during quieter hours. Rotate tables, tip well, and keep calls short in shared rooms."
            href={ROUTES.cafes}
          />
          <ContentCard
            icon={<Laptop className="h-5 w-5" aria-hidden />}
            title="Two-café rotation"
            description="Morning deep work, afternoon lighter tasks. Switching neighborhoods keeps inspiration high and burnout low."
          />
          <ContentCard
            icon={<CalendarDays className="h-5 w-5" aria-hidden />}
            title="Seasonality matters"
            description="Shoulder seasons often mean better café availability and softer prices. Check destination pages for timing notes."
            href={ROUTES.destinations}
          />
          <ContentCard
            icon={<Coffee className="h-5 w-5" aria-hidden />}
            title="Ritual anchors the week"
            description="A regular order and a familiar barista turn a temporary stay into a temporary home."
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title="Build your next base"
        description="Explore destinations known for café culture, then save spots in your dashboard wishlist."
        primaryHref={ROUTES.destinations}
        primaryLabel="Browse destinations"
        secondaryHref={ROUTES.dashboard}
        secondaryLabel="Open dashboard"
      />
    </main>
  );
}
