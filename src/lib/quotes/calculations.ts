import type { Quote, QuoteTotals } from "./types";

export function labourLineTotal(hours: number, rate: number): number {
  return round2(hours * rate);
}

export function labourLineCost(hours: number, costRate: number): number {
  return round2(hours * costRate);
}

export function materialLineTotal(quantity: number, unitCost: number, markupPercent: number): number {
  return round2(quantity * unitCost * (1 + markupPercent / 100));
}

export function materialLineCost(quantity: number, unitCost: number): number {
  return round2(quantity * unitCost);
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function computeTotals(quote: Quote): QuoteTotals {
  const labourSubtotal = round2(
    quote.labourLines.reduce((sum, line) => sum + labourLineTotal(line.hours, line.billingRate), 0)
  );
  const labourCost = round2(
    quote.labourLines.reduce((sum, line) => sum + labourLineCost(line.hours, line.costRate), 0)
  );

  const materialsSubtotal = round2(
    quote.materialLines.reduce(
      (sum, line) => sum + materialLineTotal(line.quantity, line.unitCost, line.markupPercent),
      0
    )
  );
  const materialsCost = round2(
    quote.materialLines.reduce((sum, line) => sum + materialLineCost(line.quantity, line.unitCost), 0)
  );

  const additionalSubtotal = round2(
    quote.additionalCharges.reduce((sum, line) => sum + (line.amount || 0), 0) + (quote.travel.fee || 0)
  );

  const subtotal = round2(labourSubtotal + materialsSubtotal + additionalSubtotal);
  const gst = quote.gstEnabled ? round2(subtotal * 0.1) : 0;
  const total = round2(subtotal + gst);

  const totalCost = round2(labourCost + materialsCost + additionalSubtotal + (quote.otherExpenses || 0));
  const grossProfit = round2(subtotal - totalCost);
  const profitMargin = subtotal > 0 ? round2((grossProfit / subtotal) * 100) : 0;

  return {
    labourSubtotal,
    materialsSubtotal,
    additionalSubtotal,
    subtotal,
    gst,
    total,
    labourCost,
    materialsCost,
    totalCost,
    grossProfit,
    profitMargin,
  };
}
