import { SectionHeading } from "@/shared/ui";

const BADGES = [
  { label: "Explorer", description: "For sharing travel routes" },
  { label: "Café Connoisseur", description: "For expert coffee recommendations" },
  { label: "Local Guide", description: "For hosting meetups and tips" },
];

export default function Badges() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Badges"
        title="Earn recognition for your community contributions"
        description="Collect badges for stories, meetups, and helpful local knowledge."
        align="left"
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {BADGES.map((badge) => (
          <div key={badge.label} className="rounded-3xl bg-white p-6 shadow-card">
            <div className="flex items-center gap-3 text-sm font-semibold text-coffee-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#1D4ED8]">✓</span>
              {badge.label}
            </div>
            <p className="mt-3 text-sm leading-6 text-coffee-600">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
