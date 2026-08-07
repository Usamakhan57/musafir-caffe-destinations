import {
  contactInternalEmail,
  contactReceiptEmail,
  sendEmail,
} from "@/features/email";
import { createContactMessage, contactMessageSchema } from "@/features/content/contact-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const record = createContactMessage(parsed.data);

  const receipt = contactReceiptEmail(parsed.data.name);
  receipt.to = parsed.data.email;
  await sendEmail(receipt);

  const internal = contactInternalEmail(parsed.data);
  await sendEmail(internal);

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
