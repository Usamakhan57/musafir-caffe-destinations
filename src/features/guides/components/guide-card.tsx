import Image from "next/image";
import { FadeIn } from "@/shared/ui";

export type Guide = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: { name: string; avatar: string };
  readTime: string;
  date: string;
  views: number;
  tags: string[];
};

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <FadeIn>
      <article className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-elevated">
        <div className="relative overflow-hidden">
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-coffee-700 shadow-sm">
            {guide.readTime}
          </div>
          <div className="relative h-52 w-full">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              sizes="(min-width:1024px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-coffee-900">{guide.title}</h3>
            <button
              type="button"
              aria-label="Bookmark guide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-coffee-900 transition hover:bg-slate-100"
            >
              <span aria-hidden>☆</span>
            </button>
          </div>

          <p className="text-sm leading-6 text-coffee-600">{guide.excerpt}</p>

          <div className="flex items-center gap-3 text-sm text-coffee-500">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
              <Image src={guide.author.avatar} alt={guide.author.name} fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <div className="font-medium text-coffee-900">{guide.author.name}</div>
              <div className="text-xs text-coffee-500">{guide.date} · {guide.views.toLocaleString()} reads</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
