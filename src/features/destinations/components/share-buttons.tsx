"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

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
