"use client";

import { Plus, Trash2 } from "lucide-react";
import type { BillingRateType, LabourLine, Quote, WorkerKey } from "@/lib/quotes/types";
import { BILLING_RATES, EMPLOYEES, LABOUR_CATEGORIES, WORKER_OPTIONS } from "@/lib/quotes/constants";
import { labourLineCost, labourLineTotal } from "@/lib/quotes/calculations";
import { formatCurrency } from "@/lib/quotes/format";
import { CollapsibleSection, NumberInput, Select } from "@/components/quotes/FormKit";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function newLine(): LabourLine {
  return {
    id: makeId(),
    category: LABOUR_CATEGORIES[0].group,
    task: LABOUR_CATEGORIES[0].tasks[0],
    worker: "anthony",
    workerName: EMPLOYEES.anthony.name,
    costRate: EMPLOYEES.anthony.costRate,
    billingType: "licensed",
    billingRate: BILLING_RATES.licensed.rate,
    hours: 1,
  };
}

export function LabourSection({ quote, onChange }: { quote: Quote; onChange: (patch: Partial<Quote>) => void }) {
  const lines = quote.labourLines;

  function updateLine(id: string, patch: Partial<LabourLine>) {
    onChange({ labourLines: lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) });
  }

  function removeLine(id: string) {
    onChange({ labourLines: lines.filter((l) => l.id !== id) });
  }

  function addLine() {
    onChange({ labourLines: [...lines, newLine()] });
  }

  function handleWorkerChange(line: LabourLine, worker: WorkerKey) {
    if (worker === "other") {
      updateLine(line.id, { worker, workerName: "", costRate: line.billingRate });
    } else {
      updateLine(line.id, { worker, workerName: EMPLOYEES[worker].name, costRate: EMPLOYEES[worker].costRate });
    }
  }

  function handleBillingTypeChange(line: LabourLine, billingType: BillingRateType) {
    if (billingType === "custom") {
      updateLine(line.id, { billingType });
    } else {
      updateLine(line.id, { billingType, billingRate: BILLING_RATES[billingType].rate });
    }
  }

  const lineTotal = lines.reduce((sum, l) => sum + labourLineTotal(l.hours, l.billingRate), 0);

  return (
    <CollapsibleSection
      title="Labour Calculator"
      subtitle="Select worker, category and hours — totals calculate automatically"
      right={<span className="text-xs font-bold text-electric-dark">{formatCurrency(lineTotal)}</span>}
    >
      <div className="flex flex-col gap-4">
        {lines.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink/15 py-6 text-center text-sm text-ink/40">
            No labour lines yet.
          </p>
        )}
        {lines.map((line) => {
          const group = LABOUR_CATEGORIES.find((g) => g.group === line.category) ?? LABOUR_CATEGORIES[0];
          const total = labourLineTotal(line.hours, line.billingRate);
          const cost = labourLineCost(line.hours, line.costRate);
          return (
            <div key={line.id} className="rounded-xl border border-ink/10 bg-mist/40 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Select
                  value={line.category}
                  onChange={(e) => {
                    const g = LABOUR_CATEGORIES.find((c) => c.group === e.target.value) ?? LABOUR_CATEGORIES[0];
                    updateLine(line.id, { category: g.group, task: g.tasks[0] });
                  }}
                >
                  {LABOUR_CATEGORIES.map((g) => (
                    <option key={g.group} value={g.group}>
                      {g.group}
                    </option>
                  ))}
                </Select>
                <Select value={line.task} onChange={(e) => updateLine(line.id, { task: e.target.value })}>
                  {group.tasks.map((task) => (
                    <option key={task} value={task}>
                      {task}
                    </option>
                  ))}
                </Select>
                <Select
                  value={line.worker}
                  onChange={(e) => handleWorkerChange(line, e.target.value as WorkerKey)}
                >
                  {WORKER_OPTIONS.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </Select>
                <Select
                  value={line.billingType}
                  onChange={(e) => handleBillingTypeChange(line, e.target.value as BillingRateType)}
                >
                  <option value="licensed">{BILLING_RATES.licensed.label} — $130/hr</option>
                  <option value="non-certified">{BILLING_RATES["non-certified"].label} — $100/hr</option>
                  <option value="custom">Custom rate</option>
                </Select>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {line.worker === "other" && (
                  <input
                    value={line.workerName}
                    onChange={(e) => updateLine(line.id, { workerName: e.target.value })}
                    placeholder="Worker / subcontractor name"
                    className="col-span-2 rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 sm:col-span-1"
                  />
                )}
                {line.billingType === "custom" && (
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-ink/50">Client rate ($/hr)</span>
                    <NumberInput
                      value={line.billingRate}
                      onChange={(e) => updateLine(line.id, { billingRate: Number(e.target.value) || 0 })}
                    />
                  </label>
                )}
                {line.worker === "other" && (
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-ink/50">Cost rate ($/hr)</span>
                    <NumberInput
                      value={line.costRate}
                      onChange={(e) => updateLine(line.id, { costRate: Number(e.target.value) || 0 })}
                    />
                  </label>
                )}
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-ink/50">Hours</span>
                  <NumberInput
                    value={line.hours}
                    min={0}
                    step={0.25}
                    onChange={(e) => updateLine(line.id, { hours: Number(e.target.value) || 0 })}
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
          onClick={addLine}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-electric/40 py-3 text-sm font-semibold text-electric-dark transition hover:bg-electric/5"
        >
          <Plus className="size-4" /> Add labour line
        </button>
      </div>
    </CollapsibleSection>
  );
}
