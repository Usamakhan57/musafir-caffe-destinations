import Image from "next/image";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

const TRAVELERS = [
  { name: "Lena Ortiz", location: "Barcelona, Spain", img: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop", specialty: "Street café routes and market finds." },
  { name: "Marco Rossi", location: "Milan, Italy", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", specialty: "Modern espresso culture and hidden bars." },
  { name: "Aisha Bekele", location: "Addis Ababa, Ethiopia", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop", specialty: "Origin stories, ceremonies and coffee farms." },
];

export default function FeaturedTravelers() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Featured"
        title="Meet the travelers shaping our community"
        description="Profiles from around the world who contribute deep local insight and travel expertise."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3" staggerDelay={0.12}>
        {TRAVELERS.map((traveler) => (
          <StaggerItem key={traveler.name}>
            <article className="card-hover rounded-3xl bg-white p-6 shadow-card transition-transform">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
                  <Image src={traveler.img} alt={traveler.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-coffee-900">{traveler.name}</div>
                  <div className="text-sm text-coffee-500">{traveler.location}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-coffee-600">{traveler.specialty}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
