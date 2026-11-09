"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Download, Loader2, Mail, Printer, Trash2 } from "lucide-react";
import type { Quote, QuoteStatus, QuoteTotals } from "@/lib/quotes/types";
import { QUOTE_STATUSES } from "@/lib/quotes/constants";
import { formatCurrency } from "@/lib/quotes/format";
import { useQuotesStore } from "@/lib/quotes/store";
import { Select } from "@/components/quotes/FormKit";
import { StatusBadge } from "@/components/quotes/StatusBadge";
import { site } from "@/lib/site";

export function QuoteSummaryPanel({
  quote,
  totals,
  onChange,
}: {
  quote: Quote;
  totals: QuoteTotals;
  onChange: (patch: Partial<Quote>) => void;
}) {
  const router = useRouter();
  const duplicateQuote = useQuotesStore((s) => s.duplicateQuote);
  const deleteQuote = useQuotesStore((s) => s.deleteQuote);
  const [generating, setGenerating] = useState<"download" | "print" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function generatePdfBlob() {
    const [{ pdf }, { QuoteDocument }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("@/components/quotes/pdf/QuoteDocument"),
    ]);
    const instance = pdf(<QuoteDocument quote={quote} />);
    return instance.toBlob();
  }

  async function handleDownload() {
    setGenerating("download");
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${quote.quoteNumber}-${(quote.projectName || "quote").replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(null);
    }
  }

  async function handlePrint() {
    setGenerating("print");
    try {
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } finally {
      setGenerating(null);
    }
  }

  function handleEmail() {
    const subject = encodeURIComponent(`Quote ${quote.quoteNumber} — CR Electrics Australia`);
    const body = encodeURIComponent(
      `Hi ${quote.client.clientName || "there"},\n\nPlease find attached quote ${quote.quoteNumber} for ${
        quote.projectName || "your project"
      }.\n\nThis quote is valid until ${quote.expiryDate}.\n\nKind regards,\nCR Electrics Australia\n${site.phone}\n\n(Remember to attach the downloaded PDF before sending.)`
    );
    window.location.href = `mailto:${quote.client.email || ""}?subject=${subject}&body=${body}`;
  }

  function handleDelete() {
    deleteQuote(quote.id);
    router.push("/quotes");
  }

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-20">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink/50">Status</span>
          <StatusBadge status={quote.status} />
        </div>
        <Select
          value={quote.status}
          onChange={(e) => onChange({ status: e.target.value as QuoteStatus })}
          className="mt-2"
        >
          {QUOTE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <div className="mt-5 flex flex-col gap-2 border-t border-ink/8 pt-4 text-sm">
          <Row label="Labour" value={formatCurrency(totals.labourSubtotal)} />
          <Row label="Materials" value={formatCurrency(totals.materialsSubtotal)} />
          <Row label="Additional costs" value={formatCurrency(totals.additionalSubtotal)} />
          <Row label="Subtotal" value={formatCurrency(totals.subtotal)} bold />
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 text-ink/70">
              <input
                type="checkbox"
                checked={quote.gstEnabled}
                onChange={(e) => onChange({ gstEnabled: e.target.checked })}
                className="size-4 rounded border-ink/20 accent-electric"
              />
              GST (10%)
            </label>
            <span>{formatCurrency(totals.gst)}</span>
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-ink p-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">Total {quote.gstEnabled ? "inc. GST" : ""}</p>
          <p className="font-display text-2xl font-extrabold">{formatCurrency(totals.total)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
        <button
          onClick={handleDownload}
          disabled={generating !== null}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-4 py-3 text-sm font-bold text-white transition hover:bg-electric-dark disabled:opacity-60"
        >
          {generating === "download" ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          disabled={generating !== null}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:bg-mist disabled:opacity-60"
        >
          {generating === "print" ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
          Print
        </button>
        <button
          onClick={handleEmail}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:bg-mist"
        >
          <Mail className="size-4" />
          Email quote (opens draft)
        </button>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <button
            onClick={() => duplicateQuote(quote.id)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink/15 px-3 py-2 text-xs font-semibold text-ink/70 transition hover:bg-mist"
          >
            <Copy className="size-3.5" /> Duplicate
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 className="size-3.5" /> Delete
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="font-display text-base font-bold text-ink">Delete this quote?</h2>
            <p className="mt-2 text-sm text-ink/60">This can&apos;t be undone.</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink/70 hover:bg-mist"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-bold text-ink" : "text-ink/70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
