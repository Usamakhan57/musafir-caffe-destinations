"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

import { communityStoryRoute, communityTravelerRoute } from "@/constants";
import { FadeIn } from "@/shared/ui";

import type { CommunityStory, Traveler } from "../types";

interface StoryCardProps {
  story: CommunityStory;
  author?: Traveler;
  priority?: boolean;
}

function bookmarkKey(slug: string) {
  return `musafir:bookmark:story:${slug}`;
}

function likeKey(slug: string) {
  return `musafir:like:story:${slug}`;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("musafir-story-bookmark", onChange);
  window.addEventListener("musafir-story-like", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("musafir-story-bookmark", onChange);
    window.removeEventListener("musafir-story-like", onChange);
  };
}

export function StoryCard({ story, author, priority = false }: StoryCardProps) {
  const href = communityStoryRoute(story.slug);
  const getBookmarked = useCallback(
    () => window.localStorage.getItem(bookmarkKey(story.slug)) === "1",
    [story.slug],
  );
  const getLiked = useCallback(
    () => window.localStorage.getItem(likeKey(story.slug)) === "1",
    [story.slug],
  );
  const bookmarked = useSyncExternalStore(subscribe, getBookmarked, () => false);
  const liked = useSyncExternalStore(subscribe, getLiked, () => false);

  function toggleBookmark(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(story.slug));
    else window.localStorage.setItem(bookmarkKey(story.slug), "1");
    window.dispatchEvent(new Event("musafir-story-bookmark"));
  }

  function toggleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (liked) window.localStorage.removeItem(likeKey(story.slug));
    else window.localStorage.setItem(likeKey(story.slug), "1");
    window.dispatchEvent(new Event("musafir-story-like"));
  }

  function share(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}${href}` : href;
    if (navigator.share) {
      void navigator.share({ title: story.title, url });
      return;
    }
    void navigator.clipboard?.writeText(url);
  }

  return (
    <FadeIn>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(37,99,235,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.35)]">
        <Link href={href} className="relative overflow-hidden">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#2563EB] shadow-sm">
            {story.category}
          </div>
          <div className="absolute right-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
            {story.readingMinutes} min
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={story.coverImage}
              alt={story.title}
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
              <h3 className="font-serif text-lg font-semibold leading-snug text-[#111827] transition group-hover:text-[#2563EB]">
                <Link href={href}>{story.title}</Link>
              </h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                {story.destination} · {story.country}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={toggleLike}
                aria-label={liked ? "Unlike story" : "Like story"}
                aria-pressed={liked}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#2563EB]/30 hover:text-[#2563EB]"
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} aria-hidden />
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark story"}
                aria-pressed={bookmarked}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#2563EB]/30 hover:text-[#2563EB]"
              >
                <Bookmark
                  className={`h-4 w-4 ${bookmarked ? "fill-[#2563EB] text-[#2563EB]" : ""}`}
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="Share story"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#2563EB]/30 hover:text-[#2563EB]"
              >
                <Share2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
            {story.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {story.coffeeTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#1D4ED8]"
              >
                {tag}
              </span>
            ))}
            {story.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" aria-hidden />
                {(story.likes + (liked ? 1 : 0)).toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                {story.commentsCount}
              </span>
            </span>
            <span>{story.bookmarks.toLocaleString()} saves</span>
          </div>

          {author ? (
            <Link
              href={communityTravelerRoute(author.slug)}
              className="flex items-center gap-3 rounded-xl bg-[#FAFAF9] p-2 transition hover:bg-[#EFF6FF]"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image src={author.avatar} alt="" fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-medium text-[#111827]">
                  {author.name}
                  {author.verified ? (
                    <BadgeCheck className="h-3.5 w-3.5 text-[#2563EB]" aria-label="Verified" />
                  ) : null}
                </p>
                <p className="truncate text-xs text-[#6B7280]">{author.location}</p>
              </div>
            </Link>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}

export default StoryCard;
