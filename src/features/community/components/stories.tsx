import Image from "next/image";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

const STORIES = [
  { title: "A week in Kyoto", author: "Lena Ortiz", excerpt: "Temples, cafés, and hidden alleys" , img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" },
  { title: "Ethiopian Coffee Origins", author: "Aisha Bekele", excerpt: "Tracing the roots of coffee" , img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop" },
];

export default function StoriesFeed() {
  return (
    <section className="mt-10">
      <SectionHeading
        eyebrow="Stories"
        title="Community travel stories worth reading"
        description="Real itineraries, coffee discoveries, and cultural moments shared by our members."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-2" staggerDelay={0.12}>
        {STORIES.map((story) => (
          <StaggerItem key={story.title}>
            <article className="card-hover overflow-hidden rounded-3xl bg-white shadow-card transition-transform">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={story.img} alt={story.title} fill sizes="(min-width:768px) 560px, 100vw" className="object-cover" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.2em] text-slate-500">
                  <span>Story</span>
                  <span>By {story.author}</span>
                </div>
                <h3 className="text-2xl font-semibold text-coffee-900">{story.title}</h3>
                <p className="text-sm leading-6 text-coffee-600">{story.excerpt}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
