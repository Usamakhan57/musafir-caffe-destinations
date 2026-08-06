import Image from "next/image";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

const MEETUPS = [
  { title: "Coffee & Conversation — Melbourne", date: "Aug 20", location: "Southbank, Melbourne", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" },
  { title: "Rooftop Meet — Istanbul", date: "Sep 05", location: "Beyoğlu, Istanbul", img: "https://images.unsplash.com/photo-1505765053709-447a1e8aa9a7?q=80&w=800&auto=format&fit=crop" },
];

export default function Meetups() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Meetups"
        title="Local gatherings for coffee lovers and travelers"
        description="Join curated events in cities across the world to connect, share, and explore together."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2" staggerDelay={0.12}>
        {MEETUPS.map((event) => (
          <StaggerItem key={event.title}>
            <article className="card-hover overflow-hidden rounded-3xl bg-white shadow-card transition-transform">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={event.img} alt={event.title} fill sizes="(min-width:768px) 360px, 100vw" className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-coffee-900">{event.title}</h3>
                <button className="inline-flex rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">
                  RSVP now
                </button>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
