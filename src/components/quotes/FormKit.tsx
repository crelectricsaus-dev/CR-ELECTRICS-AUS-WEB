"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-ink/60">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-ink/40">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/15";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input className={`${inputClass} ${className}`} {...rest} />;
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`${inputClass} ${className}`}
      onFocus={(e) => e.currentTarget.select()}
      {...rest}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea className={`${inputClass} min-h-24 resize-y ${className}`} {...rest} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <div className="relative">
      <select
        className={`${inputClass} appearance-none pr-9 ${className}`}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
    </div>
  );
}

export function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = true,
  accent = "default",
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  accent?: "default" | "warning";
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section
      className={`rounded-2xl border bg-white shadow-sm ${
        accent === "warning" ? "border-amber-300/70 ring-1 ring-amber-200/60" : "border-ink/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <h2
            className={`font-display text-sm font-bold tracking-tight ${
              accent === "warning" ? "text-amber-700" : "text-ink"
            }`}
          >
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-ink/50">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {right}
          <ChevronDown className={`size-4 text-ink/40 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && <div className="border-t border-ink/8 px-5 py-5">{children}</div>}
    </section>
  );
}
