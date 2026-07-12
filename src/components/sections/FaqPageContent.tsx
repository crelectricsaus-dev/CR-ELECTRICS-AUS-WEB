"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { faqs } from "@/lib/site";

const categories = ["All", "General", "Domestic", "Commercial", "Industrial", "Testing & Compliance", "Security"];

export function FaqPageContent() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <h2 className="sr-only">Frequently Asked Questions by Category</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={clsx(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm",
                active === cat ? "bg-electric text-white" : "bg-mist text-ink/70 hover:bg-ink/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-12">
          <FaqAccordion items={filtered} />
        </div>
      </Container>
    </section>
  );
}
