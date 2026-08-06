import { SectionHeading } from "@/shared/ui";

const TRENDING = [
  { title: "Island Escapes", count: 1240 },
  { title: "Café Routes", count: 980 },
  { title: "Mountain Retreats", count: 760 },
];

export default function TrendingGuides() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Trending"
        title="What travelers are saving right now"
        description="Explore the most popular guides, routes, and café collections from our community."
        align="left"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TRENDING.map((t) => (
          <div key={t.title} className="rounded-3xl bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">{t.title}</div>
            <div className="mt-4 text-3xl font-semibold text-coffee-900">{t.count.toLocaleString()}</div>
            <div className="mt-2 text-sm text-coffee-600">Guides saved by adventurous travelers.</div>
          </div>
        ))}
      </div>
    </section>
  );
}
