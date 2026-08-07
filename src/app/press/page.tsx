import Link from "next/link";
import { Camera, FileText, Mic2, Newspaper } from "lucide-react";

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
  title: "Press",
  description:
    "Press resources for MusafirCaffe — brand story, media contacts, and angles on travel, coffee culture, and community.",
  path: ROUTES.press,
});

export default function PressPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Press"
        title="Stories from the intersection of travel and coffee."
        description="MusafirCaffe is the gathering place for curious travelers — destinations, cafés, and community guides curated with care. For media inquiries, we’re here to help."
        breadcrumbs={[{ label: "Press" }]}
        actions={
          <Link
            href="mailto:press@musafircaffe.com"
            className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Email press desk
          </Link>
        }
      />

      <ProseSection
        eyebrow="Media kit"
        title="What we can share"
        description="Brand assets, founder quotes, and destination story angles — delivered quickly for deadlines."
      >
        <ContentGrid>
          <ContentCard
            icon={<Newspaper className="h-5 w-5" aria-hidden />}
            title="Company overview"
            description="MusafirCaffe helps travelers discover coffee cities, café culture, and community-written guides across the globe."
            href={ROUTES.about}
          />
          <ContentCard
            icon={<Camera className="h-5 w-5" aria-hidden />}
            title="Brand assets"
            description="Logo files and usage guidance. Contact press@musafircaffe.com for high-resolution packages."
          />
          <ContentCard
            icon={<Mic2 className="h-5 w-5" aria-hidden />}
            title="Interview topics"
            description="Digital nomad rituals, the rise of café-as-workspace, and how travelers choose destinations by coffee culture."
          />
          <ContentCard
            icon={<FileText className="h-5 w-5" aria-hidden />}
            title="Boilerplate"
            description="MusafirCaffe is where travelers meet over coffee — exploring destinations, cafés, and stories from a global community."
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title="Covering travel tech or coffee culture?"
        description="We can connect you with product leads, editors, and community voices for quotes and case studies."
        primaryHref={ROUTES.contact}
        primaryLabel="Contact us"
        secondaryHref={ROUTES.community}
        secondaryLabel="See community"
      />
    </main>
  );
}
