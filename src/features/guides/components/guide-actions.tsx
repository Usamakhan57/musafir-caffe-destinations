"use client";

import type { MouseEvent } from "react";
import { Bookmark, Check, Link2, Share2 } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

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

interface GuideActionsProps {
  slug: string;
  title: string;
  url: string;
  className?: string;
}

export function GuideActions({ slug, title, url, className = "" }: GuideActionsProps) {
  const [copied, setCopied] = useState(false);
  const getBookmark = useCallback(
    () => window.localStorage.getItem(bookmarkKey(slug)) === "1",
    [slug],
  );
  const bookmarked = useSyncExternalStore(subscribe, getBookmark, () => false);

  function toggleBookmark(event: MouseEvent) {
    event.preventDefault();
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(slug));
    else window.localStorage.setItem(bookmarkKey(slug), "1");
    window.dispatchEvent(new Event("musafir-guide-bookmark"));
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
      <button type="button" onClick={toggleBookmark} className={btn} aria-pressed={bookmarked}>
        <Bookmark
          className={`h-4 w-4 ${bookmarked ? "fill-[#2563EB] text-[#2563EB]" : ""}`}
          aria-hidden
        />
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
      <button type="button" onClick={() => void share()} className={btn} aria-label="Share guide">
        <Share2 className="h-4 w-4" aria-hidden />
        Share
      </button>
      <button
        type="button"
        onClick={() => void copyLink()}
        className={btn}
        aria-label="Copy link"
      >
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
