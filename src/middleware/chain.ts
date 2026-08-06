import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (middleware) composition utility.
 *
 * Next.js 16 supports a single `proxy.ts` entry file, so request
 * pipeline logic is split into small composable modules here and
 * chained together in `proxy.ts`. Each module can:
 *   - return a `NextResponse` to short-circuit the pipeline, or
 *   - return `undefined` to hand off to the next module.
 */
export type ProxyHandler = (
  request: NextRequest,
) => NextResponse | undefined | Promise<NextResponse | undefined>;

export function chain(handlers: readonly ProxyHandler[]): ProxyHandler {
  return async (request) => {
    for (const handler of handlers) {
      const response = await handler(request);
      if (response !== undefined) {
        return response;
      }
    }
    return NextResponse.next();
  };
}
