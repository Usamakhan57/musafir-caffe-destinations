"use client";

import { Bookmark, Check, Heart, Link2, Share2 } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

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

interface StoryActionsProps {
  slug: string;
  title: string;
  url: string;
  likes: number;
  className?: string;
}

export function StoryActions({ slug, title, url, likes, className = "" }: StoryActionsProps) {
  const [copied, setCopied] = useState(false);
  const getBookmarked = useCallback(
    () => window.localStorage.getItem(bookmarkKey(slug)) === "1",
    [slug],
  );
  const getLiked = useCallback(
    () => window.localStorage.getItem(likeKey(slug)) === "1",
    [slug],
  );
  const bookmarked = useSyncExternalStore(subscribe, getBookmarked, () => false);
  const liked = useSyncExternalStore(subscribe, getLiked, () => false);

  function toggleBookmark() {
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(slug));
    else window.localStorage.setItem(bookmarkKey(slug), "1");
    window.dispatchEvent(new Event("musafir-story-bookmark"));
  }

  function toggleLike() {
    if (liked) window.localStorage.removeItem(likeKey(slug));
    else window.localStorage.setItem(likeKey(slug), "1");
    window.dispatchEvent(new Event("musafir-story-like"));
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await copyLink();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const btn =
    "inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-[#2563EB]/40 hover:text-[#2563EB]";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button type="button" onClick={toggleLike} className={btn} aria-pressed={liked}>
        <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} aria-hidden />
        {(likes + (liked ? 1 : 0)).toLocaleString()}
      </button>
      <button type="button" onClick={toggleBookmark} className={btn} aria-pressed={bookmarked}>
        <Bookmark
          className={`h-4 w-4 ${bookmarked ? "fill-[#2563EB] text-[#2563EB]" : ""}`}
          aria-hidden
        />
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <button type="button" onClick={() => void share()} className={btn} aria-label="Share story">
        <Share2 className="h-4 w-4" aria-hidden />
        Share
      </button>
      <button type="button" onClick={() => void copyLink()} className={btn} aria-label="Copy link">
        {copied ? (
          <Check className="h-4 w-4 text-emerald-600" aria-hidden />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
