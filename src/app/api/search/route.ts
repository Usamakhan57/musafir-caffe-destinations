import { globalSearch } from "@/server/db";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";

/**
 * PostgreSQL-backed global search across destinations, cafés, guides,
 * community posts, and users. Falls back to empty result sets when DB is down.
 */
export async function GET(request: Request) {
  const limited = await checkRateLimit("search");
  if (!limited.ok) {
    return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));

  const result = await globalSearch(q, limit);
  if (!result) {
    return Response.json({
      q,
      degraded: true,
      destinations: [],
      cafes: [],
      guides: [],
      community: [],
      users: [],
    });
  }

  return Response.json({ q, degraded: false, ...result });
}
