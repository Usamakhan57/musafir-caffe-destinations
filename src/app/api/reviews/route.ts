import { createNotification } from "@/features/notifications/store";
import { reviewReceivedEmail, sendEmail } from "@/features/email";
import {
  createPublicReview,
  listPublicReviews,
} from "@/features/reviews/store";
import { publicReviewSchema } from "@/features/reviews/schemas";
import { auth } from "@/lib/auth";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetType = searchParams.get("targetType") ?? undefined;
  const targetId = searchParams.get("targetId") ?? undefined;
  const items = await listPublicReviews(targetType, targetId);
  return Response.json({ items });
}

export async function POST(request: Request) {
  const limited = await checkRateLimit("reviews");
  if (!limited.ok) {
    return Response.json({ error: "Too many reviews. Try again shortly." }, { status: 429 });
  }

  const session = await auth();
  const body = await request.json().catch(() => null);
  const parsed = publicReviewSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const review = await createPublicReview(parsed.data);

  if (parsed.data.authorEmail) {
    const mail = reviewReceivedEmail(parsed.data.targetName);
    mail.to = parsed.data.authorEmail;
    await sendEmail(mail);
  }

  if (session?.user?.id) {
    await createNotification({
      userId: session.user.id,
      kind: "review",
      title: "Review submitted",
      message: `Thanks for reviewing ${parsed.data.targetName}.`,
      href: "/dashboard/notifications",
    });
  }

  return Response.json({ ok: true, review }, { status: 201 });
}
