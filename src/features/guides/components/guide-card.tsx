"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Share2, Star } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

import { guideAuthorRoute, guideRoute } from "@/constants";
import { FadeIn } from "@/shared/ui";

import type { GuideAuthor, GuideSummary } from "../types";

interface GuideCardProps {
  guide: GuideSummary;
  author?: GuideAuthor;
  priority?: boolean;
}

function bookmarkKey(slug: string) {
  return `musafir:bookmark:guide:${slug}`;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("musafir-guide-bookmark", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("musafir-guide-bookmark", onChange);
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GuideCard({ guide, author, priority = false }: GuideCardProps) {
  const getBookmark = useCallback(
    () => window.localStorage.getItem(bookmarkKey(guide.slug)) === "1",
    [guide.slug],
  );
  const bookmarked = useSyncExternalStore(subscribe, getBookmark, () => false);
  const href = guideRoute(guide.slug);

  function toggleBookmark(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(guide.slug));
    else window.localStorage.setItem(bookmarkKey(guide.slug), "1");
    window.dispatchEvent(new Event("musafir-guide-bookmark"));
  }

  function share(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}${href}` : href;
    if (navigator.share) {
      void navigator.share({ title: guide.title, url });
      return;
    }
    void navigator.clipboard?.writeText(url);
  }

  return (
    <FadeIn>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,118,110,0.35)]">
        <Link href={href} className="relative overflow-hidden">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#0F766E] shadow-sm">
            {guide.category}
          </div>
          <div className="absolute right-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
            {guide.readingMinutes} min
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={guide.coverImage}
              alt={guide.title}
              fill
              sizes="(min-width:1024px) 320px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
              priority={priority}
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-semibold leading-snug text-[#111827] transition group-hover:text-[#0F766E]">
                <Link href={href}>{guide.title}</Link>
              </h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                {guide.destination} · {guide.country}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={toggleBookmark}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark guide"}
                aria-pressed={bookmarked}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#0F766E]/30 hover:text-[#0F766E]"
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-[#0F766E] text-[#0F766E]" : ""}`} aria-hidden />
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="Share guide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#0F766E]/30 hover:text-[#0F766E]"
              >
                <Share2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
            {guide.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3 text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#111827]">
              <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden />
              {guide.rating.toFixed(1)}
            </span>
            <span>
              {formatDate(guide.publishedAt)}
              {guide.updatedAt !== guide.publishedAt
                ? ` · Updated ${formatDate(guide.updatedAt)}`
                : ""}
            </span>
          </div>

          {author ? (
            <Link
              href={guideAuthorRoute(author.slug)}
              className="flex items-center gap-3 rounded-xl bg-[#FAFAF9] p-2 transition hover:bg-[#0F766E]/8"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image src={author.avatar} alt="" fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#111827]">{author.name}</p>
                <p className="truncate text-xs text-[#6B7280]">{author.role}</p>
              </div>
            </Link>
          ) : null}

          <Link
            href={href}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[16px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-4 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Read Guide
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}

/** Back-compat default export for older section imports. */
export default GuideCard;
