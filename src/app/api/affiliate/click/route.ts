import { z } from "zod";

import {
  affiliatePartners,
  listAffiliateClicks,
  trackAffiliateClick,
} from "@/features/monetization";

export async function GET() {
  return Response.json({
    partners: affiliatePartners,
    clicks: listAffiliateClicks().slice(0, 50),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = z
    .object({
      partnerId: z.string().min(1),
      offerId: z.string().min(1),
    })
    .safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  const click = trackAffiliateClick(parsed.data.partnerId, parsed.data.offerId);
  return Response.json({ ok: true, click }, { status: 201 });
}
