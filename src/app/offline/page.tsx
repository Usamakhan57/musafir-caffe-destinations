import { OfflinePage } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import { ROUTES } from "@/constants";

export const metadata = createPageMetadata({
  title: "Offline",
  description: "You appear to be offline. Cached MusafirCaffe pages may still be available via the PWA service worker.",
  path: ROUTES.offline,
  noIndex: true,
});

export default function OfflineRoutePage() {
  return <OfflinePage />;
}
