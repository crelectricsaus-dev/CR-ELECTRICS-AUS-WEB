"use client";

import type { Quote } from "@/lib/quotes/types";
import { CollapsibleSection, Field, TextInput } from "@/components/quotes/FormKit";

export function ClientDetailsSection({
  quote,
  onChange,
}: {
  quote: Quote;
  onChange: (patch: Partial<Quote>) => void;
}) {
  const client = quote.client;

  function updateClient(patch: Partial<Quote["client"]>) {
    onChange({ client: { ...client, ...patch } });
  }

  return (
    <CollapsibleSection title="Client & Project Details" subtitle="Who the quote is for and job reference info">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project name">
          <TextInput
            value={quote.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            placeholder="e.g. Switchboard upgrade — Mill Park"
          />
        </Field>
        <Field label="Quote number">
          <TextInput value={quote.quoteNumber} readOnly className="bg-mist text-ink/60" />
        </Field>
        <Field label="Client name">
          <TextInput value={client.clientName} onChange={(e) => updateClient({ clientName: e.target.value })} />
        </Field>
        <Field label="Company name" hint="Leave blank for residential clients">
          <TextInput value={client.companyName} onChange={(e) => updateClient({ companyName: e.target.value })} />
        </Field>
        <Field label="Phone number">
          <TextInput
            type="tel"
            value={client.phone}
            onChange={(e) => updateClient({ phone: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={client.email} onChange={(e) => updateClient({ email: e.target.value })} />
        </Field>
        <Field label="Date issued">
          <TextInput type="date" value={quote.dateIssued} onChange={(e) => onChange({ dateIssued: e.target.value })} />
        </Field>
        <Field label="Quote expiry date">
          <TextInput type="date" value={quote.expiryDate} onChange={(e) => onChange({ expiryDate: e.target.value })} />
        </Field>
        <Field label="Site address" className="sm:col-span-2">
          <TextInput
            value={client.siteAddress}
            onChange={(e) => updateClient({ siteAddress: e.target.value })}
            placeholder="Where the work will be carried out"
          />
        </Field>
        <label className="flex items-center gap-2 text-xs font-semibold text-ink/60 sm:col-span-2">
          <input
            type="checkbox"
            checked={client.sameAsSite}
            onChange={(e) =>
              updateClient({
                sameAsSite: e.target.checked,
                billingAddress: e.target.checked ? client.siteAddress : client.billingAddress,
              })
            }
            className="size-4 rounded border-ink/20 accent-electric"
          />
          Billing address is the same as site address
        </label>
        {!client.sameAsSite && (
          <Field label="Billing address" className="sm:col-span-2">
            <TextInput
              value={client.billingAddress}
              onChange={(e) => updateClient({ billingAddress: e.target.value })}
            />
          </Field>
        )}
      </div>
    </CollapsibleSection>
  );
}
