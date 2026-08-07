"use client";

import { OfflineState } from "@/shared/ui";

/** Premium offline / no-internet UI for client surfaces. */
export function OfflinePage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#FAFAF9] px-5 py-20 sm:px-8">
      <OfflineState onRetry={() => window.location.reload()} />
    </div>
  );
}
