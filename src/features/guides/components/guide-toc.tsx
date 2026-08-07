"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

interface GuideTocProps {
  items: readonly TocItem[];
}

export function GuideToc({ items }: GuideTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
        On this page
      </p>
      <ol className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-lg px-3 py-2 text-sm transition ${
                activeId === item.id
                  ? "bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                  : "text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]"
              }`}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface GuideStickySidebarProps {
  items: readonly TocItem[];
  children?: ReactNode;
}

export function GuideStickySidebar({ items, children }: GuideStickySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        <GuideToc items={items} />
        {children}
      </div>
    </aside>
  );
}
