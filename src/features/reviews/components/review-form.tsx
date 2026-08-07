"use client";

import { useState, type FormEvent } from "react";

interface ReviewFormProps {
  targetType: "destination" | "cafe" | "guide" | "tour" | "hotel" | "gear";
  targetId: string;
  targetName: string;
}

export function ReviewForm({ targetType, targetId, targetName }: ReviewFormProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      targetType,
      targetId,
      targetName,
      rating: Number(form.get("rating")),
      title: String(form.get("title") ?? ""),
      body: String(form.get("body") ?? ""),
      authorName: String(form.get("authorName") ?? ""),
      authorEmail: String(form.get("authorEmail") ?? "") || undefined,
    };

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatus("error");
      const body = await res.json().catch(() => ({}));
      setMessage(body.error ?? "Could not submit review");
      return;
    }

    setStatus("done");
    setMessage("Thanks — your review is awaiting moderation.");
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="mt-8 rounded-2xl border border-cream-200 bg-white p-5 sm:p-6"
      aria-label={`Write a review for ${targetName}`}
    >
      <h3 className="font-serif text-xl font-semibold text-coffee-900">Write a review</h3>
      <p className="mt-2 text-sm text-coffee-600">
        Share a rating and short note. Reviews are moderated before publishing.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-coffee-800">
          Your name
          <input
            name="authorName"
            required
            minLength={2}
            className="mt-1.5 h-11 w-full rounded-xl border border-cream-200 px-3 text-sm outline-none focus:border-coffee-500"
          />
        </label>
        <label className="block text-sm font-medium text-coffee-800">
          Email (optional)
          <input
            type="email"
            name="authorEmail"
            className="mt-1.5 h-11 w-full rounded-xl border border-cream-200 px-3 text-sm outline-none focus:border-coffee-500"
          />
        </label>
        <label className="block text-sm font-medium text-coffee-800">
          Rating
          <select
            name="rating"
            required
            defaultValue="5"
            className="mt-1.5 h-11 w-full rounded-xl border border-cream-200 px-3 text-sm outline-none focus:border-coffee-500"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} star{value === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-coffee-800">
          Title
          <input
            name="title"
            className="mt-1.5 h-11 w-full rounded-xl border border-cream-200 px-3 text-sm outline-none focus:border-coffee-500"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-coffee-800">
        Review
        <textarea
          name="body"
          required
          minLength={8}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-cream-200 px-3 py-2 text-sm outline-none focus:border-coffee-500"
          placeholder="What stood out — atmosphere, espresso, walkability…"
        />
      </label>

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-coffee-800 px-5 text-sm font-semibold text-cream-50 disabled:opacity-60"
      >
        {status === "saving" ? "Submitting…" : "Submit review"}
      </button>

      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-rose-700" : "text-coffee-600"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
