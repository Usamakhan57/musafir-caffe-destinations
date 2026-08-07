import Link from "next/link";
import { MapPin } from "lucide-react";

import { ROUTES } from "@/constants";
import { ErrorState } from "@/shared/ui";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-[#FAFAF9] px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="404"
        title="This page wandered off"
        description="The destination you’re looking for doesn’t exist — or the link may have moved. Let’s get you back on the map."
        icon={MapPin}
        primaryHref={ROUTES.home}
        primaryLabel="Back to home"
      />
      <nav aria-label="Helpful links" className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <Link href={ROUTES.destinations} className="font-medium text-[#0F766E] hover:underline">
          Destinations
        </Link>
        <span className="text-[#D1D5DB]" aria-hidden>
          ·
        </span>
        <Link href={ROUTES.cafes} className="font-medium text-[#0F766E] hover:underline">
          Cafés
        </Link>
        <span className="text-[#D1D5DB]" aria-hidden>
          ·
        </span>
        <Link href={ROUTES.guides} className="font-medium text-[#0F766E] hover:underline">
          Guides
        </Link>
        <span className="text-[#D1D5DB]" aria-hidden>
          ·
        </span>
        <Link href={ROUTES.help} className="font-medium text-[#0F766E] hover:underline">
          Help Center
        </Link>
      </nav>
    </div>
  );
}
