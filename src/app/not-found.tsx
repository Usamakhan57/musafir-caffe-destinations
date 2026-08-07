import Link from "next/link";
import { MapPin } from "lucide-react";

import { ROUTES } from "@/constants";
import { ErrorState } from "@/shared/ui";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#FAFAF9] px-5 py-20 sm:px-8 sm:py-28">
      <ErrorState
        code="404"
        title="This page wandered off"
        description="The destination you’re looking for doesn’t exist — or the link may have moved. Let’s get you back on the map."
        icon={MapPin}
        primaryHref={ROUTES.home}
        primaryLabel="Back to home"
      />
      <div className="sr-only">
        <Link href={ROUTES.destinations}>Browse destinations</Link>
      </div>
    </div>
  );
}
