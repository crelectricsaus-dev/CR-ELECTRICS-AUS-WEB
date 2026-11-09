"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Quote, QuoteStatus, TemplateKey } from "./types";
import { DEFAULT_TERMS, TEMPLATES } from "./constants";
import { nextQuoteNumber } from "./quoteNumber";
import { addDaysIso, todayIso } from "./format";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function blankQuote(existingQuotes: Quote[], template: TemplateKey = "blank"): Quote {
  const now = new Date().toISOString();
  const tpl = TEMPLATES.find((t) => t.key === template) ?? TEMPLATES[TEMPLATES.length - 1];
  return {
    id: makeId(),
    quoteNumber: nextQuoteNumber(existingQuotes),
    projectName: "",
    dateIssued: todayIso(),
    expiryDate: addDaysIso(30),
    status: "Draft",
    template,
    client: {
      clientName: "",
      companyName: "",
      phone: "",
      email: "",
      siteAddress: "",
      billingAddress: "",
      sameAsSite: true,
    },
    job: {
      jobDescription: "",
      scopeOfWorks: tpl.scopeStarter,
      siteNotes: "",
      clientRequirements: "",
      specialConditions: "",
    },
    attachments: [],
    labourLines: [],
    materialLines: [],
    additionalCharges: [],
    travel: { band: "none", distanceKm: "", travelTimeMins: "", fee: 0 },
    gstEnabled: true,
    termsAndConditions: DEFAULT_TERMS,
    paymentMethod: "Direct bank transfer (EFT)",
    bankDetails: "Account Name: CR Electrics Australia\nBSB: XXX-XXX\nAccount Number: XXXXXXXX\nReference: Quote Number",
    paymentSchedule: "full-on-completion",
    depositPercent: 30,
    otherExpenses: 0,
    notesInternal: "",
    createdAt: now,
    updatedAt: now,
  };
}

type QuotesState = {
  quotes: Record<string, Quote>;
  order: string[];
  createQuote: (template?: TemplateKey) => Quote;
  upsertQuote: (quote: Quote) => void;
  updateQuote: (id: string, patch: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  duplicateQuote: (id: string) => Quote | null;
  setStatus: (id: string, status: QuoteStatus) => void;
  getQuote: (id: string) => Quote | undefined;
  listQuotes: () => Quote[];
};

export const useQuotesStore = create<QuotesState>()(
  persist(
    (set, get) => ({
      quotes: {},
      order: [],
      createQuote: (template: TemplateKey = "blank") => {
        const existing = Object.values(get().quotes);
        const quote = blankQuote(existing, template);
        set((state) => ({
          quotes: { ...state.quotes, [quote.id]: quote },
          order: [quote.id, ...state.order],
        }));
        return quote;
      },
      upsertQuote: (quote: Quote) => {
        set((state) => ({
          quotes: { ...state.quotes, [quote.id]: { ...quote, updatedAt: new Date().toISOString() } },
          order: state.order.includes(quote.id) ? state.order : [quote.id, ...state.order],
        }));
      },
      updateQuote: (id: string, patch: Partial<Quote>) => {
        set((state) => {
          const current = state.quotes[id];
          if (!current) return state;
          return {
            quotes: {
              ...state.quotes,
              [id]: { ...current, ...patch, updatedAt: new Date().toISOString() },
            },
          };
        });
      },
      deleteQuote: (id: string) => {
        set((state) => {
          const quotes = { ...state.quotes };
          delete quotes[id];
          return { quotes, order: state.order.filter((qid) => qid !== id) };
        });
      },
      duplicateQuote: (id: string) => {
        const source = get().quotes[id];
        if (!source) return null;
        const existing = Object.values(get().quotes);
        const now = new Date().toISOString();
        const copy: Quote = {
          ...source,
          id: makeId(),
          quoteNumber: nextQuoteNumber(existing),
          status: "Draft",
          dateIssued: todayIso(),
          expiryDate: addDaysIso(30),
          createdAt: now,
          updatedAt: now,
          labourLines: source.labourLines.map((l) => ({ ...l, id: makeId() })),
          materialLines: source.materialLines.map((m) => ({ ...m, id: makeId() })),
          additionalCharges: source.additionalCharges.map((a) => ({ ...a, id: makeId() })),
          attachments: [],
        };
        set((state) => ({
          quotes: { ...state.quotes, [copy.id]: copy },
          order: [copy.id, ...state.order],
        }));
        return copy;
      },
      setStatus: (id: string, status: QuoteStatus) => {
        get().updateQuote(id, { status });
      },
      getQuote: (id: string) => get().quotes[id],
      listQuotes: () => {
        const { quotes, order } = get();
        return order.map((id) => quotes[id]).filter(Boolean);
      },
    }),
    {
      name: "cr-electrics-quotes",
      version: 1,
    }
  )
);

export function useQuotesHydrated(): boolean {
  return useSyncExternalStore(
    (callback) => useQuotesStore.persist?.onFinishHydration?.(callback) ?? (() => {}),
    () => useQuotesStore.persist?.hasHydrated?.() ?? true,
    () => false
  );
}
