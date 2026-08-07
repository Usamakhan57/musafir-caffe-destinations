"use client";

import type { FormEvent } from "react";

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="mt-12 rounded-[24px] border border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8"
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#111827]">
          Name
          <input
            name="name"
            required
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
          rows={5}
          className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
          placeholder="Tell us how we can help…"
        />
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-[#6B7280]">
        This demo form does not send email yet. For now, reach us at{" "}
        <a
          href="mailto:hello@musafircaffe.com"
          className="font-medium text-[#0F766E] underline-offset-2 hover:underline"
        >
          hello@musafircaffe.com
        </a>
        .
      </p>
    </form>
  );
}
