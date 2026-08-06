import Image from "next/image";
import { SectionHeading } from "@/shared/ui";

const COUNTRIES = [
  { name: "Japan", description: "Temples, cafés, and modern city energy.", img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" },
  { name: "Italy", description: "Espresso rituals, seaside cafés, and historic lanes.", img: "https://images.unsplash.com/photo-1505765053709-447a1e8aa9a7?q=80&w=800&auto=format&fit=crop" },
  { name: "Ethiopia", description: "Coffee origins, markets, and soulful ceremonies.", img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop" },
  { name: "Australia", description: "Coastal cafés, specialty roasters, and city style.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop" },
];

export default function CountryExplorer() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Explore"
        title="Country guides for coffee-focused journeys"
        description="Jump into curated travel stories and café recommendations for each region."
        align="left"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COUNTRIES.map((c) => (
          <article key={c.name} className="card-hover overflow-hidden rounded-3xl bg-white shadow-card transition-transform">
            <div className="relative h-44 w-full overflow-hidden">
              <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 320px, 100vw" className="object-cover" />
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-lg font-semibold text-coffee-900">{c.name}</h3>
              <p className="text-sm leading-6 text-coffee-600">{c.description}</p>
              <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                See guides
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
