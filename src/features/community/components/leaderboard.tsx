import { SectionHeading } from "@/shared/ui";

const LEADERS = [
  { name: "Lena O.", score: 1240 },
  { name: "Marco R.", score: 980 },
  { name: "Aisha B.", score: 760 },
];

export default function Leaderboard() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Leaderboard"
        title="Top contributors and local guides"
        description="See who is leading the community with stories, meetups, and helpful advice."
        align="left"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {LEADERS.map((leader, index) => (
          <div key={leader.name} className="rounded-3xl bg-white p-6 shadow-card">
            <div className="inline-flex rounded-full bg-[#EFF6FF] px-4 py-2 text-sm font-semibold text-[#1D4ED8]">Rank {index + 1}</div>
            <div className="mt-5 text-2xl font-semibold text-coffee-900">{leader.name}</div>
            <div className="mt-2 text-sm text-coffee-500">{leader.score.toLocaleString()} points</div>
          </div>
        ))}
      </div>
    </section>
  );
}
