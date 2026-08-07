"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(body.error ?? "Could not send message");
      return;
    }

    setStatus("done");
    setMessage("Message sent — check your inbox for a confirmation.");
    event.currentTarget.reset();
  }

  return (
    <form
      className="mt-12 rounded-[24px] border border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8"
      onSubmit={(e) => void handleSubmit(e)}
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#111827]">
          Name
          <input
            name="name"
            required
            minLength={2}
            className="mt-2 h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-medium text-[#111827]">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-2 h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-[#111827]">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
          placeholder="Tell us how we can help…"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-rose-700" : "text-[#0F766E]"}`}
          role="status"
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-[#6B7280]">
          Messages are queued through our email template layer. You can also reach{" "}
          <a
            href="mailto:hello@musafircaffe.com"
            className="font-medium text-[#0F766E] underline-offset-2 hover:underline"
          >
            hello@musafircaffe.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
