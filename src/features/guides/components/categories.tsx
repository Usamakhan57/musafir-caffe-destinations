import Image from "next/image";
import { SectionHeading } from "@/shared/ui";

const CATEGORIES = [
  {
    title: "City Guides",
    description: "Neighborhood cafés, walking routes, and boutique stays.",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Nature & Trails",
    description: "Mountain cafés, coastal drives, and forest retreats.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Café Culture",
    description: "Local roasteries, signature brews, and coffee rituals.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Road Trips",
    description: "Scenic drives, roadside cafés, and overnight stops.",
    image: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Categories() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Browse"
        title="Guide categories for every kind of journey"
        description="Choose the pace, place, and coffee culture that fit your next trip."
        align="left"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <article key={c.title} className="card-hover overflow-hidden rounded-3xl bg-white shadow-card transition-transform">
            <div className="relative h-44 w-full overflow-hidden">
              <Image src={c.image} alt={c.title} fill sizes="(min-width:1024px) 320px, 100vw" className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-lg font-semibold text-coffee-900">{c.title}</h3>
              <p className="text-sm leading-6 text-coffee-600">{c.description}</p>
              <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                Explore {c.title.toLowerCase()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
