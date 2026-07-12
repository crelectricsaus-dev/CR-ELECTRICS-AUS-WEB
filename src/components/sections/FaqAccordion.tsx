"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/site";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-ink/8 rounded-3xl border border-ink/8 bg-white">
      {items.map((item, i) => {
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-display text-base font-bold text-ink sm:text-lg">{item.question}</span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-electric text-white" : ""
                  }`}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-ink/60 sm:px-8">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
