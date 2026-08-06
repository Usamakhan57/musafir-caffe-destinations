"use client";

import { createContext, useContext } from "react";

import { APP_NAME } from "@/constants";

/**
 * Global application context.
 *
 * Holds lightweight, app-wide UI state that does not belong to a
 * single feature (theming, global banners, etc. as they are added).
 * Domain state should live in feature-level contexts instead.
 */

export interface AppContextValue {
  readonly appName: string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const value: AppContextValue = { appName: APP_NAME };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp must be used within an <AppProvider>.");
  }
  return context;
}
