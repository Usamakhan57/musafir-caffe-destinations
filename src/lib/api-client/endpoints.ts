/**
 * Central endpoint registry.
 * Reference these instead of hard-coding API paths at call sites.
 */
export const ENDPOINTS = {
  health: "/health",
} as const;

export type EndpointPath = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
