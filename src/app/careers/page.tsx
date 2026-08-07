import Link from "next/link";
import { Briefcase, Laptop, Sparkles, Users } from "lucide-react";

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
  title: "Careers",
  description:
    "Join MusafirCaffe — we’re hiring builders, writers, and community leads who love travel and coffee culture.",
  path: ROUTES.careers,
});

const roles = [
  {
    title: "Senior Product Designer",
    type: "Remote · Full-time",
    description:
      "Shape the experience of discovering destinations and cafés — maps, collections, and the quiet details travelers notice.",
  },
  {
    title: "Destination Editor",
    type: "Remote · Contract",
    description:
      "Commission and edit city guides with the warmth of National Geographic storytelling and the utility of Lonely Planet.",
  },
  {
    title: "Community Manager",
    type: "Remote · Full-time",
    description:
      "Host meetups, spotlight traveler stories, and keep the MusafirCaffe community welcoming across time zones.",
  },
] as const;

export default function CareersPage() {
  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Careers"
        title="Work where travel and coffee culture meet."
        description="We’re a remote-first team building tools for curious travelers. If you care about craft, hospitality, and places that feel like home — pull up a chair."
        breadcrumbs={[{ label: "Careers" }]}
        actions={
          <Link
            href={ROUTES.contact}
            className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Introduce yourself
          </Link>
        }
      />

      <ProseSection
        eyebrow="Culture"
        title="How we work"
        description="Small team, high trust, and a bias toward writing that travelers actually use."
      >
        <ContentGrid>
          <ContentCard
            icon={<Laptop className="h-5 w-5" aria-hidden />}
            title="Remote by default"
            description="Collaborate across continents. We protect deep work and async updates so travel and life can coexist."
          />
          <ContentCard
            icon={<Users className="h-5 w-5" aria-hidden />}
            title="Community-minded"
            description="Every feature should feel hospitable — inclusive, clear, and respectful of the places we cover."
          />
          <ContentCard
            icon={<Sparkles className="h-5 w-5" aria-hidden />}
            title="Craft over clutter"
            description="We ship thoughtfully. Premium design, honest content, and no dark patterns."
          />
        </ContentGrid>
      </ProseSection>

      <ProseSection
        eyebrow="Open roles"
        title="Current openings"
        description="Don’t see a perfect fit? Send a note — exceptional people create their own seats."
        tone="muted"
      >
        <ul className="flex flex-col gap-4">
          {roles.map((role) => (
            <li
              key={role.title}
              className="rounded-[22px] border border-[#E5E7EB] bg-white p-6 sm:flex sm:items-start sm:justify-between sm:gap-8 sm:p-7"
            >
              <div>
                <div className="flex items-center gap-2 text-[#0F766E]">
                  <Briefcase className="h-4 w-4" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {role.type}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[#111827]">{role.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
                  {role.description}
                </p>
              </div>
              <Link
                href={ROUTES.contact}
                className="mt-5 inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[#0F766E]/25 px-5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#0F766E]/8 sm:mt-0"
              >
                Apply
              </Link>
            </li>
          ))}
        </ul>
      </ProseSection>

      <ContentCta
        title="Build the traveler’s café table with us"
        description="Tell us what you’d bring to MusafirCaffe — portfolios, writing samples, or a favorite coffee city."
        primaryHref={ROUTES.contact}
        primaryLabel="Contact careers"
        secondaryHref={ROUTES.about}
        secondaryLabel="About us"
      />
    </main>
  );
}
