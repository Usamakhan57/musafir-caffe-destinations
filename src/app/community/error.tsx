"use client";

import { AlertTriangle } from "lucide-react";

import { ErrorState } from "@/shared/ui";

export default function CommunityError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-white px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="500"
        title="Community temporarily unavailable"
        description="We couldn’t load the community experience. Please try again."
        icon={AlertTriangle}
        onRetry={reset}
      />
    </div>
  );
}
