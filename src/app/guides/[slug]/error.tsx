"use client";

import { AlertTriangle } from "lucide-react";

import { ErrorState } from "@/shared/ui";

export default function GuideDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-white px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="500"
        title="Couldn’t load this guide"
        description="Something went wrong while opening the article. Please try again."
        icon={AlertTriangle}
        onRetry={reset}
      />
    </div>
  );
}
