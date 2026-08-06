import { SectionHeading } from "@/shared/ui";

const TOPICS = ["Introductions", "Local Tips", "Photo Share", "Events & Meetups"];

export default function DiscussionCategories() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Discussions"
        title="Join conversations with fellow travelers"
        description="From local recommendations to photo highlights, find the topics that inspire your next trip."
        align="left"
      />

      <div className="mt-8 flex flex-wrap gap-4">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-coffee-700 shadow-sm transition hover:border-[#2563EB] hover:bg-[#EFF6FF]"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
}
