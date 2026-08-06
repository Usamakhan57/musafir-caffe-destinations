"use client";

import { AppProvider } from "@/contexts";

/**
 * Composes every client-side provider in one place.
 *
 * The root layout wraps the app with this single component; when a new
 * provider is added (theme, query client, etc.), register it here —
 * the layout never needs to change again.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
