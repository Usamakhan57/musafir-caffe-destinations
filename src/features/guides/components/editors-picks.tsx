import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";
import GuideCard, { Guide } from "./guide-card";

const PICKS: Guide[] = [
  { id: "p1", title: "Sicily Espresso Route", excerpt: "Coastal roasts and hillside cafés.", image: "https://images.unsplash.com/photo-1505765053709-447a1e8aa9a7?q=80&w=1200&auto=format&fit=crop", author: { name: "Giulia B.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" }, readTime: "9 min", date: "Jun 12, 2026", views: 8800, tags: ["Sicily"] },
  { id: "p2", title: "Osaka Night Cafés", excerpt: "Late-night cafés and noodle pairings.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop", author: { name: "Hiro T.", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" }, readTime: "6 min", date: "May 9, 2026", views: 5400, tags: ["Osaka"] },
  { id: "p3", title: "Porto Café Walk", excerpt: "Historic squares and modern blends.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", author: { name: "Rui S.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" }, readTime: "7 min", date: "Apr 2, 2026", views: 4700, tags: ["Porto"] },
  { id: "p4", title: "Cape Town Roaster Scene", excerpt: "Coastal cafés and mountain views.", image: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop", author: { name: "Lindiwe M.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" }, readTime: "8 min", date: "Mar 11, 2026", views: 6200, tags: ["Cape Town"] },
];

export default function EditorsPicks() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Editor’s Picks"
        title="Premium routes selected by local travelers"
        description="Hand-picked guides that highlight the most memorable coffee journeys and cultural experiences."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
        {PICKS.map((p) => (
          <StaggerItem key={p.id}>
            <GuideCard guide={p} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
