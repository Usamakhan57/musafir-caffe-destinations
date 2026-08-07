"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useTransition } from "react";

type MediaItem = {
  id: string;
  title: string;
  url: string;
  alt: string;
  folder: string;
};

type ListResponse = {
  items: MediaItem[];
  page: number;
  totalPages: number;
  total: number;
};

export function MediaLibrary() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [folder, setFolder] = useState("uploads");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const load = useCallback(() => {
    startTransition(async () => {
      const params = new URLSearchParams({ page: "1", pageSize: "24" });
      if (query.trim()) params.set("q", query.trim());
      const res = await fetch(`/api/admin/media?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Failed to load media");
        return;
      }
      setData((await res.json()) as ListResponse);
    });
  }, [query]);

  useEffect(() => {
    load();
  }, [load]);

  async function upload() {
    setError(null);
    const res = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        url,
        alt,
        folder,
        mimeType: "image/jpeg",
        sizeBytes: 0,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Upload failed");
      return;
    }
    setTitle("");
    setUrl("");
    setAlt("");
    load();
  }

  async function remove(id: string) {
    await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
    load();
  }

  return (
    <section className="space-y-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
          Media library
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">Image upload & gallery</h2>
        <p className="mt-2 text-sm text-slate-600">
          Supabase-storage ready interface. Paste an image URL to register assets in the CMS gallery.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-slate-600">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600">
          Folder
          <input
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          Image URL
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-slate-600 sm:col-span-2">
          Alt text
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={() => void upload()}
          className="h-11 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white sm:col-span-2"
        >
          Upload / register image
        </button>
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search gallery…"
          aria-label="Search media"
          className="h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm"
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pending && !data ? (
          <p className="text-sm text-slate-500">Loading gallery…</p>
        ) : null}
        {data?.items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
          >
            <div className="relative aspect-[4/3]">
              <Image src={item.url} alt={item.alt || item.title} fill className="object-cover" sizes="320px" />
            </div>
            <div className="space-y-2 p-3">
              <h3 className="truncate text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.folder}</p>
              <button
                type="button"
                onClick={() => void remove(item.id)}
                className="text-xs font-semibold text-rose-700"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
