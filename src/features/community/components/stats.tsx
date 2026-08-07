import {
  getAllStories,
  getAllTravelers,
  getCommunityFilterOptions,
} from "../data/community-loader";
import { SectionHeading } from "@/shared/ui";

export default async function CommunityStats() {
  const stories = await getAllStories();
  const travelers = getAllTravelers();
  const options = getCommunityFilterOptions();

  const STATS = [
    {
      label: "Travelers",
      value: travelers.length,
      description: "Active community profiles",
    },
    {
      label: "Stories",
      value: stories.length,
      description: "Shared journeys",
    },
    {
      label: "Countries",
      value: options.countries.length,
      description: "Covered in posts",
    },
  ];

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
            <div className="text-4xl font-semibold text-coffee-900">
              {stat.value.toLocaleString()}
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-500">
              {stat.label}
            </div>
            <p className="mt-3 text-sm leading-6 text-coffee-600">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
