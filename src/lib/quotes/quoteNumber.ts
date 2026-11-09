import type { Quote } from "./types";

export function nextQuoteNumber(existingQuotes: Quote[]): string {
  const year = new Date().getFullYear();
  const prefix = `CR-${year}-`;
  let highest = 0;
  for (const quote of existingQuotes) {
    if (quote.quoteNumber?.startsWith(prefix)) {
      const n = parseInt(quote.quoteNumber.slice(prefix.length), 10);
      if (!Number.isNaN(n) && n > highest) highest = n;
    }
  }
  return `${prefix}${String(highest + 1).padStart(4, "0")}`;
}
