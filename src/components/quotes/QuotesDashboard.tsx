"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, FileText, Plus, Search, Trash2, Zap } from "lucide-react";
import { useQuotesHydrated, useQuotesStore } from "@/lib/quotes/store";
import { QUOTE_STATUSES, TEMPLATES } from "@/lib/quotes/constants";
import type { QuoteStatus, TemplateKey } from "@/lib/quotes/types";
import { computeTotals } from "@/lib/quotes/calculations";
import { formatCurrency, formatDate } from "@/lib/quotes/format";
import { StatusBadge } from "@/components/quotes/StatusBadge";

export function QuotesDashboard() {
  const router = useRouter();
  const hydrated = useQuotesHydrated();
  const quotesById = useQuotesStore((s) => s.quotes);
  const order = useQuotesStore((s) => s.order);
  const quotes = useMemo(() => order.map((id) => quotesById[id]).filter(Boolean), [quotesById, order]);
  const createQuote = useQuotesStore((s) => s.createQuote);
  const duplicateQuote = useQuotesStore((s) => s.duplicateQuote);
  const deleteQuote = useQuotesStore((s) => s.deleteQuote);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "All">("All");
  const [showTemplates, setShowTemplates] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchesStatus = statusFilter === "All" || quote.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        quote.quoteNumber.toLowerCase().includes(q) ||
        quote.projectName.toLowerCase().includes(q) ||
        quote.client.clientName.toLowerCase().includes(q) ||
        quote.client.companyName.toLowerCase().includes(q)
      );
    });
  }, [quotes, search, statusFilter]);

  function handleCreate(template: TemplateKey) {
    const quote = createQuote(template);
    setShowTemplates(false);
    router.push(`/quotes/${quote.id}`);
  }

  if (!hydrated) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-ink/50 sm:px-6">Loading quotes…</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Quotes</h1>
          <p className="mt-1 text-sm text-ink/60">Create, manage and send professional electrical quotes.</p>
        </div>
        <button
          onClick={() => setShowTemplates(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(36,87,255,0.6)] transition hover:bg-electric-dark"
        >
          <Plus className="size-4" /> New Quote
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by quote #, client, company or project…"
            className="w-full rounded-full border border-ink/10 bg-white py-3 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(["All", ...QUOTE_STATUSES] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                statusFilter === status
                  ? "border-ink bg-ink text-white"
                  : "border-ink/10 bg-white text-ink/60 hover:border-ink/30"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-white/60 py-16 text-center">
          <FileText className="size-8 text-ink/25" />
          <p className="text-sm font-medium text-ink/60">
            {quotes.length === 0 ? "No quotes yet — create your first one." : "No quotes match your search."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((quote) => {
            const totals = computeTotals(quote);
            return (
              <div
                key={quote.id}
                className="group relative flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-xs font-bold tracking-wide text-electric-dark">
                    {quote.quoteNumber}
                  </span>
                  <StatusBadge status={quote.status} />
                </div>
                <button
                  onClick={() => router.push(`/quotes/${quote.id}`)}
                  className="mt-2 text-left"
                >
                  <h2 className="line-clamp-1 font-display text-base font-bold text-ink">
                    {quote.projectName || "Untitled project"}
                  </h2>
                  <p className="mt-0.5 line-clamp-1 text-sm text-ink/60">
                    {quote.client.clientName || quote.client.companyName || "No client name"}
                  </p>
                </button>
                <div className="mt-4 flex items-end justify-between border-t border-ink/5 pt-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-ink/40">Total (inc. GST)</p>
                    <p className="font-display text-lg font-extrabold text-ink">{formatCurrency(totals.total)}</p>
                  </div>
                  <p className="text-xs text-ink/45">{formatDate(quote.dateIssued)}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/quotes/${quote.id}`)}
                    className="flex-1 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white transition hover:bg-ink/85"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => duplicateQuote(quote.id)}
                    title="Duplicate"
                    className="rounded-full border border-ink/10 p-2 text-ink/60 transition hover:border-electric hover:text-electric"
                  >
                    <Copy className="size-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(quote.id)}
                    title="Delete"
                    className="rounded-full border border-ink/10 p-2 text-ink/60 transition hover:border-red-400 hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-2xl rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Choose a starting template</h2>
              <button onClick={() => setShowTemplates(false)} className="text-sm text-ink/50 hover:text-ink">
                Close
              </button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.key}
                  onClick={() => handleCreate(template.key)}
                  className="flex flex-col items-start gap-1 rounded-2xl border border-ink/10 p-4 text-left transition hover:border-electric hover:bg-electric/5"
                >
                  <span className="flex items-center gap-1.5 font-display text-sm font-bold text-ink">
                    <Zap className="size-3.5 text-electric" /> {template.label}
                  </span>
                  <span className="text-xs text-ink/55">{template.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="font-display text-base font-bold text-ink">Delete this quote?</h2>
            <p className="mt-2 text-sm text-ink/60">This can&apos;t be undone.</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink/70 hover:bg-mist"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteQuote(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
