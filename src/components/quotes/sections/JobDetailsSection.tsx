"use client";

import { useRef } from "react";
import { Paperclip, X } from "lucide-react";
import type { Quote } from "@/lib/quotes/types";
import { LABOUR_CATEGORIES } from "@/lib/quotes/constants";
import { CollapsibleSection, Field, TextArea } from "@/components/quotes/FormKit";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function JobDetailsSection({
  quote,
  onChange,
}: {
  quote: Quote;
  onChange: (patch: Partial<Quote>) => void;
}) {
  const job = quote.job;
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateJob(patch: Partial<Quote["job"]>) {
    onChange({ job: { ...job, ...patch } });
  }

  function insertScopeItem(item: string) {
    const line = `• ${item}`;
    const existing = job.scopeOfWorks.trim();
    if (existing.includes(line)) return;
    updateJob({ scopeOfWorks: existing ? `${existing}\n${line}` : line });
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onChange({
          attachments: [...quote.attachments, { id: makeId(), name: file.name, dataUrl }],
        });
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <CollapsibleSection title="Job Details" subtitle="Scope, notes, requirements and photos">
      <div className="flex flex-col gap-4">
        <Field label="Job description">
          <TextArea
            value={job.jobDescription}
            onChange={(e) => updateJob({ jobDescription: e.target.value })}
            placeholder="Short summary of the job"
            className="min-h-16"
          />
        </Field>

        <div>
          <span className="text-xs font-semibold text-ink/60">Quick-add scope items (tap to insert)</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LABOUR_CATEGORIES.flatMap((g) => g.tasks).map((task) => (
              <button
                key={task}
                type="button"
                onClick={() => insertScopeItem(task)}
                className="rounded-full border border-electric/25 bg-electric/5 px-3 py-1.5 text-[11px] font-medium text-electric-dark transition hover:bg-electric/15"
              >
                + {task}
              </button>
            ))}
          </div>
        </div>

        <Field label="Scope of works">
          <TextArea
            value={job.scopeOfWorks}
            onChange={(e) => updateJob({ scopeOfWorks: e.target.value })}
            className="min-h-32"
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Site notes">
            <TextArea value={job.siteNotes} onChange={(e) => updateJob({ siteNotes: e.target.value })} />
          </Field>
          <Field label="Client requirements">
            <TextArea
              value={job.clientRequirements}
              onChange={(e) => updateJob({ clientRequirements: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Special conditions">
          <TextArea
            value={job.specialConditions}
            onChange={(e) => updateJob({ specialConditions: e.target.value })}
            className="min-h-16"
          />
        </Field>

        <div>
          <span className="text-xs font-semibold text-ink/60">Attachments / photos</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {quote.attachments.map((a) => (
              <div key={a.id} className="group relative size-20 overflow-hidden rounded-xl border border-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.dataUrl} alt={a.name} className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChange({ attachments: quote.attachments.filter((att) => att.id !== a.id) })}
                  className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink/20 text-ink/40 transition hover:border-electric hover:text-electric"
            >
              <Paperclip className="size-4" />
              <span className="text-[10px] font-medium">Add photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
