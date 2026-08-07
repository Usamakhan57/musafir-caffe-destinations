import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

import { ROUTES } from "@/constants";
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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,118,110,0.35)]">
        <Link href={ROUTES.travelTips} className="relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]">
          <div className="absolute right-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
            {guide.readTime}
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              sizes="(min-width:1024px) 320px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg font-semibold leading-snug text-[#111827] transition group-hover:text-[#0F766E]">
              <Link href={ROUTES.travelTips} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]">
                {guide.title}
              </Link>
            </h3>
            <Link
              href={ROUTES.register}
              aria-label="Save guide — join free"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:border-[#0F766E]/30 hover:text-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
            >
              <Bookmark className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[#6B7280]">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-3 text-sm text-[#6B7280]">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#FAFAF9] ring-2 ring-[#0F766E]/10">
              <Image
                src={guide.author.avatar}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-[#111827]">{guide.author.name}</div>
              <div className="text-xs text-[#6B7280]">
                {guide.date} · {guide.views.toLocaleString()} reads
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#0F766E]/8 px-3 py-1 text-xs font-semibold text-[#0F766E]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
