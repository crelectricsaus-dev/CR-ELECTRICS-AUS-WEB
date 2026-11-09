"use client";

import type { PaymentScheduleType, Quote } from "@/lib/quotes/types";
import { PAYMENT_SCHEDULE_LABELS } from "@/lib/quotes/constants";
import { CollapsibleSection, Field, NumberInput, Select, TextArea, TextInput } from "@/components/quotes/FormKit";

export function TermsPaymentSection({
  quote,
  onChange,
}: {
  quote: Quote;
  onChange: (patch: Partial<Quote>) => void;
}) {
  return (
    <CollapsibleSection title="Terms & Payment" subtitle="Terms and conditions, payment method and schedule" defaultOpen={false}>
      <div className="flex flex-col gap-5">
        <Field label="Terms & conditions" hint="Prefilled — edit as needed for this quote">
          <TextArea
            value={quote.termsAndConditions}
            onChange={(e) => onChange({ termsAndConditions: e.target.value })}
            className="min-h-40"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Payment method">
            <TextInput
              value={quote.paymentMethod}
              onChange={(e) => onChange({ paymentMethod: e.target.value })}
            />
          </Field>
          <Field label="Payment schedule">
            <Select
              value={quote.paymentSchedule}
              onChange={(e) => onChange({ paymentSchedule: e.target.value as PaymentScheduleType })}
            >
              {Object.entries(PAYMENT_SCHEDULE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          {quote.paymentSchedule === "deposit-final" && (
            <Field label="Deposit percentage (%)">
              <NumberInput
                value={quote.depositPercent}
                min={0}
                max={100}
                onChange={(e) => onChange({ depositPercent: Number(e.target.value) || 0 })}
              />
            </Field>
          )}
          <Field label="Bank details (placeholder shown on quote)" className="sm:col-span-2">
            <TextArea value={quote.bankDetails} onChange={(e) => onChange({ bankDetails: e.target.value })} className="min-h-24" />
          </Field>
        </div>
      </div>
    </CollapsibleSection>
  );
}
