export default function GuidesSearch() {
  return (
    <div className="mx-auto -mt-24 w-[92%] max-w-[1280px] px-6 lg:px-0">
      <div className="rounded-[28px] bg-white p-5 shadow-[0_25px_70px_-30px_rgba(2,6,23,0.2)]">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-sm text-coffee-600">Search guides, cafés, and curated routes</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <label className="sr-only">Search query</label>
              <input
                className="flex-1 rounded-2xl border border-transparent bg-slate-50 px-4 py-4 text-sm placeholder:text-slate-400 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                placeholder="Search destination, café, or travel theme"
                aria-label="Search guides"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end">
            <select className="h-[64px] min-w-[160px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15">
              <option>All regions</option>
            </select>
            <select className="h-[64px] min-w-[160px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15">
              <option>All categories</option>
            </select>
            <button className="h-[64px] rounded-2xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
