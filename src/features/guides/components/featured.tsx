import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";
import GuideCard, { Guide } from "./guide-card";

const GUIDES: Guide[] = [
  {
    id: "1",
    title: "Istanbul: Coffee & Markets",
    excerpt: "A three-day route through Istanbul’s best cafés, spice markets, and waterfront walks.",
    image: "https://images.unsplash.com/photo-1505765053709-447a1e8aa9a7?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Mehmet Yılmaz", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" },
    readTime: "8 min",
    date: "Jul 12, 2026",
    views: 12400,
    tags: ["Istanbul", "Cafés", "Markets"],
  },
  {
    id: "2",
    title: "Melbourne Coffee Crawl",
    excerpt: "Discover the espresso bars and hidden laneway cafés that define Melbourne’s coffee scene.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Claire Thompson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    readTime: "6 min",
    date: "Jun 5, 2026",
    views: 9800,
    tags: ["Melbourne", "Coffee"],
  },
  {
    id: "3",
    title: "Addis Ababa: Coffee Origins",
    excerpt: "A cultural tour of Ethiopia’s coffee ceremonies, markets, and origin farms.",
    image: "https://images.unsplash.com/photo-1494522358652-54e6a0b0a0a8?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Aisha Bekele", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" },
    readTime: "10 min",
    date: "May 20, 2026",
    views: 15200,
    tags: ["Ethiopia", "Origins", "Coffee"],
  },
  {
    id: "4",
    title: "Kyoto: Cafés & Temples",
    excerpt: "Tranquil cafés, tea houses and walking routes through historical Kyoto.",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Lena Ortiz", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" },
    readTime: "7 min",
    date: "Apr 10, 2026",
    views: 8600,
    tags: ["Kyoto", "Tea", "Culture"],
  },
  {
    id: "5",
    title: "Lisbon: Coastal Cafés",
    excerpt: "Coastal drives, pastel de nata spots, and seaside espresso bars in Lisbon.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Marco Rossi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    readTime: "5 min",
    date: "Mar 14, 2026",
    views: 7200,
    tags: ["Lisbon", "Coast"],
  },
  {
    id: "6",
    title: "San Francisco Coffee Trail",
    excerpt: "Neighborhood cafés and specialty roasters across the Bay Area.",
    image: "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Sam Rivera", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" },
    readTime: "9 min",
    date: "Feb 2, 2026",
    views: 6400,
    tags: ["San Francisco", "Specialty"],
  },
  {
    id: "7",
    title: "Seoul’s Coffee Scene",
    excerpt: "From hanok cafés to modern roasteries—Seoul’s diverse coffee culture.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Jiwoo Park", avatar: "https://images.unsplash.com/photo-1545996124-1b6a9c2d1b16?q=80&w=400&auto=format&fit=crop" },
    readTime: "8 min",
    date: "Jan 18, 2026",
    views: 9800,
    tags: ["Seoul", "Cafés"],
  },
  {
    id: "8",
    title: "Helsinki Design Cafés",
    excerpt: "Minimalist cafés, design studios, and winter-ready roasts in Helsinki.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Aino K.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    readTime: "6 min",
    date: "Dec 3, 2025",
    views: 5300,
    tags: ["Helsinki", "Design"],
  },
];

export default function FeaturedGuides() {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Featured"
        title="Editor-selected routes for your next trip"
        description="These standout guides are curated for immersive coffee travel, local culture, and unforgettable cafés."
        align="left"
      />

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-4" staggerDelay={0.12}>
        {GUIDES.map((g) => (
          <StaggerItem key={g.id}>
            <GuideCard guide={g} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
