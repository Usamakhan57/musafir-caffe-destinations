import Image from "next/image";
import { SectionHeading } from "@/shared/ui";

const COFFEE = [
  {
    title: "Ethiopian Origins",
    desc: "A deep dive into Ethiopian coffee traditions.",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Italian Espresso",
    desc: "Mastering espresso culture and cafés in Italy.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CoffeeGuides() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Coffee"
        title="Deep dive guides for the world’s most iconic brews"
        description="Explore origin stories, espresso rituals, and the cafés that shape the coffee landscape."
        align="left"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {COFFEE.map((c) => (
          <article key={c.title} className="card-hover overflow-hidden rounded-3xl bg-white shadow-card transition-transform">
            <div className="relative h-52 w-full overflow-hidden">
              <Image src={c.img} alt={c.title} fill sizes="(min-width:768px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <div className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">Coffee Guide</div>
              <h3 className="text-xl font-semibold text-coffee-900">{c.title}</h3>
              <p className="text-sm leading-6 text-coffee-600">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
