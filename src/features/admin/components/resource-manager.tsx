"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

export type CrudColumn = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => ReactNode;
};

interface ResourceManagerProps {
  resource: string;
  title: string;
  columns: CrudColumn[];
  createFields: Array<{
    key: string;
    label: string;
    type?: "text" | "textarea" | "select" | "number" | "url";
    options?: Array<{ label: string; value: string }>;
    required?: boolean;
  }>;
  supportsStatusBulk?: boolean;
  apiBase?: string;
}

type ListResponse = {
  items: Record<string, unknown>[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function ResourceManager({
  resource,
  title,
  columns,
  createFields,
  supportsStatusBulk = true,
  apiBase,
}: ResourceManagerProps) {
  const endpoint = apiBase ?? `/api/admin/${resource}`;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const load = useCallback(() => {
    startTransition(async () => {
      setError(null);
      const params = new URLSearchParams({
        page: String(page),
        pageSize: "10",
      });
      if (query.trim()) params.set("q", query.trim());
      if (status) params.set("status", status);
      const res = await fetch(`${endpoint}?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Failed to load records");
        return;
      }
      const json = (await res.json()) as ListResponse;
      setData(json);
      setSelected([]);
    });
  }, [endpoint, page, query, status]);

  useEffect(() => {
    load();
  }, [load]);

  const initialForm = useMemo(() => {
    const base: Record<string, string> = {};
    for (const field of createFields) {
      base[field.key] = field.options?.[0]?.value ?? "";
    }
    return base;
  }, [createFields]);

  function openCreate() {
    setEditingId(null);
    setForm(initialForm);
    setFormOpen(true);
  }

  function openEdit(row: Record<string, unknown>) {
    const next: Record<string, string> = {};
    for (const field of createFields) {
      const value = row[field.key];
      if (Array.isArray(value)) next[field.key] = value.join(", ");
      else next[field.key] = value == null ? "" : String(value);
    }
    setEditingId(String(row.id));
    setForm(next);
    setFormOpen(true);
  }

  async function submitForm() {
    setError(null);
    const payload: Record<string, unknown> = {};
    for (const field of createFields) {
      const raw = form[field.key] ?? "";
      if (field.key === "tags") {
        payload.tags = raw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      } else if (field.key === "rating" || field.key === "sizeBytes") {
        payload[field.key] = Number(raw) || 0;
      } else if (field.key === "emailVerified") {
        payload[field.key] = raw === "true";
      } else if (field.key === "categoryId" || field.key === "coverImage") {
        payload[field.key] = raw ? raw : null;
      } else {
        payload[field.key] = raw;
      }
    }

    const res = await fetch(endpoint, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, patch: payload } : payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Save failed");
      return;
    }
    setFormOpen(false);
    load();
  }

  async function runBulk(action: "delete" | "publish" | "archive" | "draft") {
    if (selected.length === 0) return;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected, action }),
    });
    if (!res.ok) {
      setError("Bulk action failed");
      return;
    }
    load();
  }

  function toggleAll(checked: boolean) {
    if (!data) return;
    setSelected(checked ? data.items.map((item) => String(item.id)) : []);
  }

  return (
    <section className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
            Manage
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Create
          </button>
          {supportsStatusBulk ? (
            <>
              <button
                type="button"
                onClick={() => void runBulk("publish")}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => void runBulk("archive")}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Archive
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => void runBulk("delete")}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
          placeholder="Search…"
          aria-label={`Search ${title}`}
          className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
        />
        {supportsStatusBulk ? (
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            aria-label="Filter by status"
            className="h-11 rounded-xl border border-slate-200 px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={!!data && data.items.length > 0 && selected.length === data.items.length}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-3 font-semibold">
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending && !data ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-3 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : null}
            {data?.items.map((row) => {
              const rowId = String(row.id);
              return (
                <tr key={rowId} className="border-t border-slate-100">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${rowId}`}
                      checked={selected.includes(rowId)}
                      onChange={(e) => {
                        setSelected((prev) =>
                          e.target.checked
                            ? [...prev, rowId]
                            : prev.filter((id) => id !== rowId),
                        );
                      }}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="max-w-[220px] truncate px-3 py-3 text-slate-700">
                      {col.render
                        ? col.render(row)
                        : Array.isArray(row[col.key])
                          ? (row[col.key] as string[]).join(", ")
                          : String(row[col.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => openEdit(row)}
                      className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {data && data.items.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-3 py-8 text-center text-slate-500">
                  No records found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {data ? (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Page {data.page} of {data.totalPages} · {data.total} total
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-slate-200 px-3 py-1.5 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={data.page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-slate-200 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {formOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? `Edit ${title}` : `Create ${title}`}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-950">
              {editingId ? "Edit" : "Create"} {title}
            </h3>
            <div className="mt-4 space-y-3">
              {createFields.map((field) => (
                <label key={field.key} className="block text-xs font-semibold text-slate-600">
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      value={form[field.key] ?? ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      rows={3}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={form[field.key] ?? ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
                    >
                      {(field.options ?? []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
                      value={form[field.key] ?? ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
                      required={field.required}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void submitForm()}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
