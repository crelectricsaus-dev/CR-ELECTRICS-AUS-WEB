"use client";

import { Plus, Trash2 } from "lucide-react";
import type { MaterialLine, Quote } from "@/lib/quotes/types";
import { MATERIAL_PRESETS } from "@/lib/quotes/constants";
import { materialLineCost, materialLineTotal } from "@/lib/quotes/calculations";
import { formatCurrency } from "@/lib/quotes/format";
import { CollapsibleSection, NumberInput, TextInput } from "@/components/quotes/FormKit";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function newLine(): MaterialLine {
  return { id: makeId(), name: "", description: "", quantity: 1, unitCost: 0, markupPercent: 20 };
}

export function MaterialsSection({ quote, onChange }: { quote: Quote; onChange: (patch: Partial<Quote>) => void }) {
  const lines = quote.materialLines;

  function updateLine(id: string, patch: Partial<MaterialLine>) {
    onChange({ materialLines: lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) });
  }

  function removeLine(id: string) {
    onChange({ materialLines: lines.filter((l) => l.id !== id) });
  }

  function addLine(preset?: (typeof MATERIAL_PRESETS)[number]) {
    const line = newLine();
    if (preset) {
      line.name = preset.name;
      line.description = preset.description;
      line.unitCost = preset.unitCost;
    }
    onChange({ materialLines: [...lines, line] });
  }

  const lineTotal = lines.reduce((sum, l) => sum + materialLineTotal(l.quantity, l.unitCost, l.markupPercent), 0);

  return (
    <CollapsibleSection
      title="Materials"
      subtitle="Add items, quantities, cost & markup — totals calculate automatically"
      right={<span className="text-xs font-bold text-electric-dark">{formatCurrency(lineTotal)}</span>}
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-semibold text-ink/60">Quick-add common items</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {MATERIAL_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => addLine(preset)}
                className="rounded-full border border-electric/25 bg-electric/5 px-3 py-1.5 text-[11px] font-medium text-electric-dark transition hover:bg-electric/15"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

        {lines.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink/15 py-6 text-center text-sm text-ink/40">
            No materials added yet.
          </p>
        )}

        {lines.map((line) => {
          const total = materialLineTotal(line.quantity, line.unitCost, line.markupPercent);
          const cost = materialLineCost(line.quantity, line.unitCost);
          return (
            <div key={line.id} className="rounded-xl border border-ink/10 bg-mist/40 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TextInput
                  value={line.name}
                  onChange={(e) => updateLine(line.id, { name: e.target.value })}
                  placeholder="Item name"
                />
                <TextInput
                  value={line.description}
                  onChange={(e) => updateLine(line.id, { description: e.target.value })}
                  placeholder="Description (optional)"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Qty</span>
                  <NumberInput
                    value={line.quantity}
                    min={0}
                    onChange={(e) => updateLine(line.id, { quantity: Number(e.target.value) || 0 })}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Unit cost ($)</span>
                  <NumberInput
                    value={line.unitCost}
                    min={0}
                    onChange={(e) => updateLine(line.id, { unitCost: Number(e.target.value) || 0 })}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Markup %</span>
                  <NumberInput
                    value={line.markupPercent}
                    min={0}
                    onChange={(e) => updateLine(line.id, { markupPercent: Number(e.target.value) || 0 })}
                  />
                </label>
                <div className="flex flex-col justify-end gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Client total</span>
                  <span className="rounded-xl bg-ink px-3.5 py-2.5 text-sm font-bold text-white">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex flex-col justify-end gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Cost (internal)</span>
                  <span className="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-sm font-semibold text-amber-700">
                    {formatCurrency(cost)}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => addLine()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-electric/40 py-3 text-sm font-semibold text-electric-dark transition hover:bg-electric/5"
        >
          <Plus className="size-4" /> Add custom item
        </button>
      </div>
    </CollapsibleSection>
  );
}
