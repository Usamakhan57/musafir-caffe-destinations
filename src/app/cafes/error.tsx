"use client";

import { AlertTriangle } from "lucide-react";

import { ErrorState } from "@/shared/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#FAFAF9] px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="500"
        title="Something went wrong"
        description={
          error.message
            ? "We hit an unexpected bump. Try again, or return home while we smooth the path."
            : "An unexpected error occurred. Please try again."
        }
        icon={AlertTriangle}
        onRetry={reset}
      />
    </div>
  );
}
