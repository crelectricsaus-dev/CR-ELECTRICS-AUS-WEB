"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useQuotesHydrated, useQuotesStore } from "@/lib/quotes/store";
import { computeTotals } from "@/lib/quotes/calculations";
import type { Quote } from "@/lib/quotes/types";
import { ClientDetailsSection } from "@/components/quotes/sections/ClientDetailsSection";
import { JobDetailsSection } from "@/components/quotes/sections/JobDetailsSection";
import { LabourSection } from "@/components/quotes/sections/LabourSection";
import { MaterialsSection } from "@/components/quotes/sections/MaterialsSection";
import { AdditionalCostsSection } from "@/components/quotes/sections/AdditionalCostsSection";
import { ProfitCalculator } from "@/components/quotes/sections/ProfitCalculator";
import { TermsPaymentSection } from "@/components/quotes/sections/TermsPaymentSection";
import { QuoteSummaryPanel } from "@/components/quotes/QuoteSummaryPanel";

export function QuoteEditor({ id }: { id: string }) {
  const hydrated = useQuotesHydrated();
  const quote = useQuotesStore((s) => s.quotes[id]);
  const updateQuote = useQuotesStore((s) => s.updateQuote);

  if (!hydrated) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-ink/50 sm:px-6">Loading quote…</div>;
  }

  if (!quote) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-ink/60">Quote not found.</p>
        <Link href="/quotes" className="mt-4 inline-block text-sm font-semibold text-electric">
          Back to dashboard
        </Link>
      </div>
    );
  }

  function onChange(patch: Partial<Quote>) {
    updateQuote(id, patch);
  }

  const totals = computeTotals(quote);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <Link href="/quotes" className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 hover:text-ink">
        <ArrowLeft className="size-3.5" /> All quotes
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <input
          value={quote.projectName}
          onChange={(e) => onChange({ projectName: e.target.value })}
          placeholder="Untitled project"
          className="w-full border-none bg-transparent font-display text-2xl font-extrabold tracking-tight text-ink outline-none placeholder:text-ink/25 sm:text-3xl"
        />
        <p className="text-sm font-medium text-ink/45">{quote.quoteNumber}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <ClientDetailsSection quote={quote} onChange={onChange} />
          <JobDetailsSection quote={quote} onChange={onChange} />
          <LabourSection quote={quote} onChange={onChange} />
          <MaterialsSection quote={quote} onChange={onChange} />
          <AdditionalCostsSection quote={quote} onChange={onChange} />
          <ProfitCalculator quote={quote} totals={totals} onChange={onChange} />
          <TermsPaymentSection quote={quote} onChange={onChange} />
        </div>
        <div className="lg:col-span-1">
          <QuoteSummaryPanel quote={quote} totals={totals} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
