import {
  contactInternalEmail,
  contactReceiptEmail,
  sendEmail,
} from "@/features/email";
import { createContactMessage } from "@/features/content/contact-store";
import { contactMessageSchema } from "@/features/content/schemas";
import { checkRateLimit } from "@/features/auth/lib/rate-limit";

export async function POST(request: Request) {
  const limited = await checkRateLimit("contact");
  if (!limited.ok) {
    return Response.json({ error: "Too many messages. Try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const record = await createContactMessage(parsed.data);

  const receipt = contactReceiptEmail(parsed.data.name);
  receipt.to = parsed.data.email;
  await sendEmail(receipt);

  const internal = contactInternalEmail(parsed.data);
  await sendEmail(internal);

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
