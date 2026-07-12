"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const testimonial = testimonials[index];

  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-px w-8 bg-electric" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-electric">Client Reviews</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Trusted by businesses &amp; homeowners
        </h2>

        <div className="relative mt-12 rounded-3xl border border-ink/5 bg-white p-10 shadow-xl shadow-ink/5 sm:p-14">
          <Quote className="mx-auto size-8 text-electric/30" />
          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="size-4 fill-electric text-electric" />
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-ink/75 sm:text-xl">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="mt-6">
            <div className="font-display text-base font-bold text-ink">{testimonial.name}</div>
            <div className="text-sm text-ink/50">{testimonial.role}</div>
          </div>

          <button
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 shadow-sm transition-colors hover:bg-mist sm:-left-5"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 shadow-sm transition-colors hover:bg-mist sm:-right-5"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-electric" : "w-1.5 bg-ink/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
