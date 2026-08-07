import Link from "next/link";

import { ROUTES } from "@/constants";
import { SectionHeading } from "@/shared/ui";

const TOPICS = [
  { label: "Introductions", href: ROUTES.register },
  { label: "Local Tips", href: ROUTES.travelTips },
  { label: "Photo Share", href: ROUTES.community },
  { label: "Events & Meetups", href: ROUTES.community },
] as const;

export default function DiscussionCategories() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Discussions"
        title="Join conversations with fellow travelers"
        description="From local recommendations to photo highlights, find the topics that inspire your next trip."
        align="left"
      />

      <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
        {TOPICS.map((topic) => (
          <Link
            key={topic.label}
            href={topic.href}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-coffee-700 shadow-sm transition hover:border-[#2563EB] hover:bg-[#EFF6FF]"
          >
            {topic.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
