import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Coffee, Compass, Heart, SearchX } from "lucide-react";

import { cn } from "@/shared/utils";

type EmptyVariant = "cafes" | "guides" | "search" | "favorites" | "generic";

const presets: Record<
  EmptyVariant,
  { icon: LucideIcon; title: string; description: string }
> = {
  cafes: {
    icon: Coffee,
    title: "No cafés found",
    description: "Try a different city, amenity filter, or clear your search to explore more.",
  },
  guides: {
    icon: Compass,
    title: "No guides yet",
    description: "Travel guides for this filter will appear here as the editorial team publishes them.",
  },
  search: {
    icon: SearchX,
    title: "No results match your search",
    description: "Check the spelling or broaden your filters to discover more destinations and cafés.",
  },
  favorites: {
    icon: Heart,
    title: "Nothing saved yet",
    description: "Bookmark cafés, destinations, and guides — your favorites will gather here.",
  },
  generic: {
    icon: Compass,
    title: "Nothing to show",
    description: "There’s no content here right now. Try again later or explore another section.",
  },
};

interface EmptyStateProps {
  variant?: EmptyVariant;
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionHref,
  actionLabel = "Explore",
  className,
}: EmptyStateProps) {
  const preset = presets[variant];
  const Icon = preset.icon;

  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-6 py-16 text-center shadow-[0_16px_40px_-32px_rgba(15,118,110,0.25)] sm:px-10",
        className,
      )}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#111827]">
        {title ?? preset.title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6B7280] sm:text-base">
        {description ?? preset.description}
      </p>
      {actionHref ? (
        <Link
          href={actionHref}
          className="btn-ripple mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5f59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
