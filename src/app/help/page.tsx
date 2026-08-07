import Link from "next/link";
import { BookOpen, LifeBuoy, Lock, UserRound } from "lucide-react";

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
  title: "Help Center",
  description:
    "Get help with MusafirCaffe accounts, browsing destinations and cafés, community features, and trip planning tools.",
  path: ROUTES.help,
});

export default function HelpCenterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Support"
        title="Help Center"
        description="Guides for getting started, managing your account, and making the most of destinations, cafés, and community tools."
        breadcrumbs={[{ label: "Help Center" }]}
        actions={
          <Link
            href={ROUTES.contact}
            className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Contact support
          </Link>
        }
      />

      <ProseSection
        eyebrow="Topics"
        title="Popular help articles"
        description="Start here — most traveler questions live in these four areas."
      >
        <ContentGrid columns={2}>
          <ContentCard
            icon={<UserRound className="h-5 w-5" aria-hidden />}
            title="Account & profile"
            description="Create an account, update your profile, and manage notification preferences from the dashboard."
            href={ROUTES.register}
          />
          <ContentCard
            icon={<Lock className="h-5 w-5" aria-hidden />}
            title="Sign in & security"
            description="Reset your password, verify email, and keep your session secure across devices."
            href={ROUTES.forgotPassword}
          />
          <ContentCard
            icon={<BookOpen className="h-5 w-5" aria-hidden />}
            title="Using guides & destinations"
            description="Search cities, filter cafés, and follow curated guides for itineraries that respect local pace."
            href={ROUTES.guides}
          />
          <ContentCard
            icon={<LifeBuoy className="h-5 w-5" aria-hidden />}
            title="FAQ"
            description="Quick answers about pricing, community contributions, and how MusafirCaffe works."
            href={ROUTES.faq}
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title="Can’t find what you need?"
        description="Send us a note — include your account email and a short description of the issue."
        primaryHref={ROUTES.contact}
        primaryLabel="Contact us"
        secondaryHref={ROUTES.faq}
        secondaryLabel="Read FAQ"
      />
    </main>
  );
}
