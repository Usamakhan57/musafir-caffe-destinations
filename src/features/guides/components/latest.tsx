import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";
import GuideCard, { Guide } from "./guide-card";

const LATEST: Guide[] = [
  { id: "l1", title: "Copenhagen Coffee Week", excerpt: "Where to find new-wave cafés and roasteries.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop", author: { name: "Mikael S.", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" }, readTime: "5 min", date: "Jul 28, 2026", views: 3200, tags: ["Copenhagen", "New Wave"] },
  { id: "l2", title: "Portland Roasteries Tour", excerpt: "Top micro-roasters and tasting rooms.", image: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop", author: { name: "Sam Rivera", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" }, readTime: "6 min", date: "Jul 25, 2026", views: 4100, tags: ["Portland", "Roasters"] },
  { id: "l3", title: "Athens Café Culture", excerpt: "From old coffee houses to modern blends.", image: "https://images.unsplash.com/photo-1494522358652-54e6a0b0a0a8?q=80&w=1200&auto=format&fit=crop", author: { name: "Eleni P.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" }, readTime: "7 min", date: "Jul 22, 2026", views: 2700, tags: ["Athens", "History"] },
  { id: "l4", title: "Hanoi Street Coffee", excerpt: "Egg coffee, verandas, and city rituals.", image: "https://images.unsplash.com/photo-1505765053709-447a1e8aa9a7?q=80&w=1200&auto=format&fit=crop", author: { name: "Nguyen T.", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" }, readTime: "6 min", date: "Jul 18, 2026", views: 3900, tags: ["Hanoi", "Street Food"] },
  { id: "l5", title: "Buenos Aires Cafés", excerpt: "Classic cafés and late-night conversations.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", author: { name: "Sofia R.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" }, readTime: "8 min", date: "Jul 10, 2026", views: 2100, tags: ["Buenos Aires", "Culture"] },
  { id: "l6", title: "Lisbon Sunrise Cafés", excerpt: "Seaside cafés for an early espresso.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", author: { name: "Mariana L.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" }, readTime: "5 min", date: "Jul 5, 2026", views: 1800, tags: ["Lisbon", "Coast"] },
  { id: "l7", title: "Seoul Hidden Cafés", excerpt: "Quieter corners in a bustling city.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop", author: { name: "Jiwoo Park", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" }, readTime: "6 min", date: "Jul 1, 2026", views: 2500, tags: ["Seoul", "Hidden Gems"] },
  { id: "l8", title: "Reykjavik Winter Roasts", excerpt: "Warm roasts for cold mornings.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop", author: { name: "Anna K.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" }, readTime: "7 min", date: "Jun 28, 2026", views: 900, tags: ["Reykjavik", "Winter"] },
];

export default function LatestGuides() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Latest"
        title="Fresh guides added every week"
        description="Stay current with the newest routes, cafés, and stories from our traveling contributors."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
        {LATEST.map((g) => (
          <StaggerItem key={g.id}>
            <GuideCard guide={g} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
