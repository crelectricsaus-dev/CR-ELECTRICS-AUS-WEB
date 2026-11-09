"use client";

import { Plus, Trash2 } from "lucide-react";
import type { AdditionalChargeLine, AdditionalChargeType, Quote, TravelBand } from "@/lib/quotes/types";
import { ADDITIONAL_CHARGE_TYPES, TRAVEL_BANDS } from "@/lib/quotes/constants";
import { formatCurrency } from "@/lib/quotes/format";
import { CollapsibleSection, NumberInput, Select, TextInput } from "@/components/quotes/FormKit";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function newCharge(): AdditionalChargeLine {
  return { id: makeId(), type: "Equipment hire", description: "", amount: 0 };
}

export function AdditionalCostsSection({
  quote,
  onChange,
}: {
  quote: Quote;
  onChange: (patch: Partial<Quote>) => void;
}) {
  const travel = quote.travel;
  const charges = quote.additionalCharges;

  function updateTravel(patch: Partial<Quote["travel"]>) {
    onChange({ travel: { ...travel, ...patch } });
  }

  function handleBandChange(band: TravelBand) {
    const config = TRAVEL_BANDS.find((b) => b.value === band);
    updateTravel({ band, fee: config?.defaultFee ?? travel.fee });
  }

  function updateCharge(id: string, patch: Partial<AdditionalChargeLine>) {
    onChange({ additionalCharges: charges.map((c) => (c.id === id ? { ...c, ...patch } : c)) });
  }

  function removeCharge(id: string) {
    onChange({ additionalCharges: charges.filter((c) => c.id !== id) });
  }

  function addCharge() {
    onChange({ additionalCharges: [...charges, newCharge()] });
  }

  const total = charges.reduce((sum, c) => sum + (c.amount || 0), 0) + (travel.fee || 0);

  return (
    <CollapsibleSection
      title="Additional Costs"
      subtitle="Travel, equipment hire, permits, callouts and other charges"
      right={<span className="text-xs font-bold text-electric-dark">{formatCurrency(total)}</span>}
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-ink/10 bg-mist/40 p-4">
          <span className="text-xs font-semibold text-ink/60">Travel fee</span>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select value={travel.band} onChange={(e) => handleBandChange(e.target.value as TravelBand)}>
              {TRAVEL_BANDS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </Select>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-ink/50">Distance (km)</span>
              <NumberInput
                value={travel.distanceKm}
                min={0}
                onChange={(e) => updateTravel({ distanceKm: e.target.value === "" ? "" : Number(e.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-ink/50">Travel time (mins)</span>
              <NumberInput
                value={travel.travelTimeMins}
                min={0}
                onChange={(e) =>
                  updateTravel({ travelTimeMins: e.target.value === "" ? "" : Number(e.target.value) })
                }
              />
            </label>
          </div>
          {travel.band !== "none" && (
            <label className="mt-3 flex max-w-xs flex-col gap-1">
              <span className="text-[11px] font-semibold text-ink/50">Travel fee ($)</span>
              <NumberInput value={travel.fee} min={0} onChange={(e) => updateTravel({ fee: Number(e.target.value) || 0 })} />
            </label>
          )}
        </div>

        {charges.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink/15 py-6 text-center text-sm text-ink/40">
            No additional charges added.
          </p>
        )}

        {charges.map((charge) => (
          <div key={charge.id} className="grid grid-cols-1 gap-3 rounded-xl border border-ink/10 bg-mist/40 p-4 sm:grid-cols-4">
            <Select value={charge.type} onChange={(e) => updateCharge(charge.id, { type: e.target.value as AdditionalChargeType })}>
              {ADDITIONAL_CHARGE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <TextInput
              value={charge.description}
              onChange={(e) => updateCharge(charge.id, { description: e.target.value })}
              placeholder="Description (optional)"
              className="sm:col-span-1"
            />
            <NumberInput
              value={charge.amount}
              min={0}
              onChange={(e) => updateCharge(charge.id, { amount: Number(e.target.value) || 0 })}
              placeholder="Amount ($)"
            />
            <button
              type="button"
              onClick={() => removeCharge(charge.id)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-transparent text-xs font-semibold text-red-500 hover:text-red-600"
            >
              <Trash2 className="size-3.5" /> Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCharge}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-electric/40 py-3 text-sm font-semibold text-electric-dark transition hover:bg-electric/5"
        >
          <Plus className="size-4" /> Add charge
        </button>
      </div>
    </CollapsibleSection>
  );
}
