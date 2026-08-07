import { reviewReceivedEmail, sendEmail } from "@/features/email";
import { createNotification } from "@/features/notifications";
import {
  createPublicReview,
  listPublicReviews,
  publicReviewSchema,
} from "@/features/reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetType = searchParams.get("targetType") ?? undefined;
  const targetId = searchParams.get("targetId") ?? undefined;
  return Response.json({ items: listPublicReviews(targetType, targetId) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = publicReviewSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const review = createPublicReview(parsed.data);

  if (parsed.data.authorEmail) {
    const mail = reviewReceivedEmail(parsed.data.targetName);
    mail.to = parsed.data.authorEmail;
    await sendEmail(mail);
  }

  createNotification({
    userId: "demo",
    kind: "review",
    title: "Review submitted",
    message: `Thanks for reviewing ${parsed.data.targetName}.`,
    href: "/dashboard/notifications",
  });

  return Response.json({ ok: true, review }, { status: 201 });
}
