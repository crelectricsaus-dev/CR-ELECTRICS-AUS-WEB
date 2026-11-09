"use client";

import { Lock } from "lucide-react";
import type { Quote, QuoteTotals } from "@/lib/quotes/types";
import { formatCurrency } from "@/lib/quotes/format";
import { CollapsibleSection, NumberInput } from "@/components/quotes/FormKit";

export function ProfitCalculator({
  quote,
  totals,
  onChange,
}: {
  quote: Quote;
  totals: QuoteTotals;
  onChange: (patch: Partial<Quote>) => void;
}) {
  return (
    <CollapsibleSection
      title="Profit Calculator"
      subtitle="Internal only — never appears on the client PDF"
      accent="warning"
      right={
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
          <Lock className="size-3" /> Internal
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Revenue (ex GST)" value={formatCurrency(totals.subtotal)} />
        <Metric label="Labour cost" value={formatCurrency(totals.labourCost)} negative />
        <Metric label="Material cost" value={formatCurrency(totals.materialsCost)} negative />
        <Metric label="Additional costs" value={formatCurrency(totals.additionalSubtotal)} negative />
      </div>

      <div className="mt-4 max-w-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-ink/50">Other expenses ($)</span>
          <NumberInput
            value={quote.otherExpenses}
            min={0}
            onChange={(e) => onChange({ otherExpenses: Number(e.target.value) || 0 })}
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-ink p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Gross profit</p>
          <p className="mt-1 font-display text-3xl font-extrabold">{formatCurrency(totals.grossProfit)}</p>
        </div>
        <div className="rounded-2xl bg-electric p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Profit margin</p>
          <p className="mt-1 font-display text-3xl font-extrabold">{totals.profitMargin.toFixed(1)}%</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}

function Metric({ label, value, negative = false }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700/70">{label}</p>
      <p className={`mt-1 text-sm font-bold ${negative ? "text-amber-800" : "text-ink"}`}>
        {negative ? "−" : ""}
        {value}
      </p>
    </div>
  );
}
