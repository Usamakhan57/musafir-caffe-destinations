"use client";

import { Bookmark, Check, Link2, Share2 } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

interface CafeActionsProps {
  slug: string;
  title: string;
  url: string;
}

function bookmarkKey(slug: string) {
  return `musafir:bookmark:cafe:${slug}`;
}

function subscribeBookmarks(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("musafir-cafe-bookmark", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("musafir-cafe-bookmark", onStoreChange);
  };
}

export function CafeActions({ slug, title, url }: CafeActionsProps) {
  const [copied, setCopied] = useState(false);
  const getBookmark = useCallback(
    () => window.localStorage.getItem(bookmarkKey(slug)) === "1",
    [slug],
  );
  const bookmarked = useSyncExternalStore(subscribeBookmarks, getBookmark, () => false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function toggleBookmark() {
    if (bookmarked) window.localStorage.removeItem(bookmarkKey(slug));
    else window.localStorage.setItem(bookmarkKey(slug), "1");
    window.dispatchEvent(new Event("musafir-cafe-bookmark"));
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={toggleBookmark}
        aria-pressed={bookmarked}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
      >
        <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-[#0F766E] text-[#0F766E]" : ""}`} aria-hidden />
        {bookmarked ? "Saved" : "Bookmark"}
      </button>
      <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827]">
        <Share2 className="h-4 w-4 text-[#0F766E]" aria-hidden />
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#0F766E]/35 hover:text-[#0F766E]"
      >
        {copied ? <Check className="h-4 w-4 text-[#0F766E]" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
