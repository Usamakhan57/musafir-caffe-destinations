import { SectionHeading } from "@/shared/ui";

const STATS = [
  { label: "Members", value: 12480, description: "Active explorers" },
  { label: "Stories", value: 3820, description: "Shared journeys" },
  { label: "Meetups", value: 420, description: "Local gatherings" },
];

export default function CommunityStats() {
  return (
    <section className="mx-auto -mt-24 mb-8 w-[92%] max-w-[1280px] rounded-[32px] bg-white p-6 shadow-elevated sm:p-8">
      <SectionHeading
        eyebrow="Community Metrics"
        title="A thriving network of travelers and coffee creators"
        description="Real connections, fresh stories, and meaningful meetups happening every week."
        align="left"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-slate-50 p-6 text-center">
            <div className="text-4xl font-semibold text-coffee-900">{stat.value.toLocaleString()}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-500">{stat.label}</div>
            <p className="mt-3 text-sm leading-6 text-coffee-600">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
