"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";

const serviceOptions = [
  "Domestic Electrical",
  "Commercial Electrical",
  "Industrial Electrical",
  "Medical Electrical",
  "Security Systems",
  "Testing & Compliance",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const service = String(formData.get("service") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = encodeURIComponent(`Quote Request — ${service || "General Enquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-ink/8 bg-white p-8 shadow-sm sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-electric"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-electric"
            placeholder="04XX XXX XXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-electric"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-ink">
          Service Required
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-electric"
        >
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-ink/12 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-electric"
          placeholder="Describe your job, location and preferred timeframe..."
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-electric px-6 py-4 text-sm font-bold text-white transition-all hover:bg-electric-dark hover:shadow-[0_8px_30px_-6px_rgba(36,87,255,0.6)]"
      >
        <Send className="size-4" /> Send Enquiry
      </button>

      {submitted && (
        <p className="text-center text-sm font-medium text-electric">
          Your email app should now be open with your enquiry pre-filled — just hit send. We&rsquo;ll reply promptly.
        </p>
      )}
    </form>
  );
}
