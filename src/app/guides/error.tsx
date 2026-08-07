"use client";

import { AlertTriangle } from "lucide-react";

import { ErrorState } from "@/shared/ui";

export default function GuidesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-white px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="500"
        title="Guides temporarily unavailable"
        description={
          error.message
            ? "We couldn’t load this guide experience. Try again, or browse destinations while we fix it."
            : "An unexpected error occurred while loading guides."
        }
        icon={AlertTriangle}
        onRetry={reset}
      />
    </div>
  );
}
