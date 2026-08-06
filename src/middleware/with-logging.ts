import type { NextRequest } from "next/server";

import { logger } from "@/lib/logger";

import type { ProxyHandler } from "./chain";

const log = logger.child("proxy");

/**
 * Observability module: logs incoming requests in development.
 * Authentication, redirects, and header rules can be added later as
 * sibling modules and composed in `proxy.ts`.
 */
export const withLogging: ProxyHandler = (request: NextRequest) => {
  log.debug(`${request.method} ${request.nextUrl.pathname}`);
  // Never short-circuits — always passes to the next module in the chain.
  return undefined;
};
