/**
 * Email template library — provider-agnostic HTML builders.
 * Wire to Resend/SendGrid/Supabase by implementing `sendEmail`.
 */

export type EmailTemplateId =
  | "welcome"
  | "verify-email"
  | "reset-password"
  | "contact-receipt"
  | "contact-internal"
  | "review-received"
  | "membership-welcome"
  | "notification-digest";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
  templateId: EmailTemplateId;
}

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title></head>
<body style="margin:0;background:#FAFAF9;font-family:Georgia,serif;color:#111827;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF9;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #E5E7EB;border-radius:22px;padding:32px;">
        <tr><td>
          <p style="margin:0;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#0F766E;font-family:system-ui,sans-serif;">MusafirCaffe</p>
          <h1 style="margin:16px 0 12px;font-size:28px;line-height:1.2;">${title}</h1>
          <div style="font-size:15px;line-height:1.7;color:#4B5563;font-family:system-ui,sans-serif;">${body}</div>
          <p style="margin:28px 0 0;font-size:12px;color:#9CA3AF;font-family:system-ui,sans-serif;">Where travelers meet over coffee.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeEmail(name: string): EmailPayload {
  const subject = "Welcome to MusafirCaffe";
  const body = `<p>Hi ${name},</p><p>Your traveler account is ready. Save cafés, plan trips, and join the community.</p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Hi ${name}, welcome to MusafirCaffe.`,
    templateId: "welcome",
  };
}

export function verifyEmailTemplate(name: string, verifyUrl: string): EmailPayload {
  const subject = "Verify your email";
  const body = `<p>Hi ${name},</p><p>Confirm your email to unlock wishlist and trip tools.</p><p><a href="${verifyUrl}" style="color:#0F766E;">Verify email</a></p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Verify your email: ${verifyUrl}`,
    templateId: "verify-email",
  };
}

export function resetPasswordEmail(name: string, resetUrl: string): EmailPayload {
  const subject = "Reset your password";
  const body = `<p>Hi ${name},</p><p>Use this secure link to choose a new password.</p><p><a href="${resetUrl}" style="color:#0F766E;">Reset password</a></p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Reset password: ${resetUrl}`,
    templateId: "reset-password",
  };
}

export function contactReceiptEmail(name: string): EmailPayload {
  const subject = "We received your message";
  const body = `<p>Hi ${name},</p><p>Thanks for writing. Our support team typically replies within one business day.</p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Hi ${name}, we received your message.`,
    templateId: "contact-receipt",
  };
}

export function contactInternalEmail(input: {
  name: string;
  email: string;
  message: string;
}): EmailPayload {
  const subject = `Contact form: ${input.name}`;
  const body = `<p><strong>From:</strong> ${input.name} (${input.email})</p><p>${input.message}</p>`;
  return {
    to: "support@musafircaffe.com",
    subject,
    html: layout(subject, body),
    text: `${input.name} <${input.email}>: ${input.message}`,
    templateId: "contact-internal",
  };
}

export function reviewReceivedEmail(targetName: string): EmailPayload {
  const subject = "Thanks for your review";
  const body = `<p>Your review for <strong>${targetName}</strong> is in moderation and will appear after approval.</p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Thanks for reviewing ${targetName}.`,
    templateId: "review-received",
  };
}

export function membershipWelcomeEmail(planName: string): EmailPayload {
  const subject = `Welcome to ${planName}`;
  const body = `<p>Your premium membership is active. Enjoy priority recommendations, offline packs, and affiliate travel perks.</p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `Welcome to ${planName}.`,
    templateId: "membership-welcome",
  };
}

export function notificationDigestEmail(count: number): EmailPayload {
  const subject = `You have ${count} new updates`;
  const body = `<p>Open your dashboard notifications to catch up on community and trip updates.</p>`;
  return {
    to: "",
    subject,
    html: layout(subject, body),
    text: `You have ${count} new updates.`,
    templateId: "notification-digest",
  };
}

/**
 * Payment/provider-ready mailer. Without EMAIL_PROVIDER configured,
 * messages are logged for local/dev and returned as queued.
 */
export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; id: string }> {
  const id = crypto.randomUUID();
  const provider = process.env.EMAIL_PROVIDER ?? "console";

  if (provider === "console" || !process.env.EMAIL_API_KEY) {
    console.info("[email:queued]", {
      id,
      templateId: payload.templateId,
      to: payload.to,
      subject: payload.subject,
    });
    return { ok: true, id };
  }

  // Provider adapters (Resend/SendGrid) plug in here using EMAIL_API_KEY.
  console.info("[email:provider-ready]", { id, provider, to: payload.to });
  return { ok: true, id };
}
