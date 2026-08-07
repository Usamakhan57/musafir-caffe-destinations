import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Home, RefreshCw, WifiOff } from "lucide-react";

import { ROUTES } from "@/constants";
import { cn } from "@/shared/utils";

interface ErrorStateProps {
  code?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  primaryHref?: string;
  primaryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  code,
  title,
  description,
  icon: Icon,
  primaryHref = ROUTES.home,
  primaryLabel = "Back to home",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex w-full max-w-lg flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white px-6 py-14 text-center shadow-[0_24px_60px_-36px_rgba(15,118,110,0.35)] sm:px-10",
        className,
      )}
    >
      {code ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
          {code}
        </p>
      ) : null}
      {Icon ? (
        <span className="mt-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Icon className="h-7 w-7" aria-hidden />
        </span>
      ) : null}
      <h1 className="mt-5 font-serif text-3xl font-semibold text-[#111827] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280] sm:text-base">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={primaryHref}
          className="btn-ripple inline-flex h-11 items-center gap-2 rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#0d5f59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          <Home className="h-4 w-4" aria-hidden />
          {primaryLabel}
        </Link>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="btn-ripple inline-flex h-11 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-5 text-sm font-semibold text-[#111827] transition hover:border-[#0F766E]/40 hover:text-[#0F766E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      code="Offline"
      title="You’re offline"
      description="Check your connection and try again. Saved pages may still be available."
      icon={WifiOff}
      onRetry={onRetry}
    />
  );
}
