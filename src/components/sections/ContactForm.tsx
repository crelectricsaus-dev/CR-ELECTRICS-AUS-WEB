"use client";

import { useEffect, useRef, useState } from "react";
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

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Bring the result into view so it can't end up hidden behind the sticky
  // mobile bar or below the fold after the form clears.
  useEffect(() => {
    if (status === "sent" || status === "error") {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    // Honeypot: people never see or tick this box, bots usually do.
    // Pretend success so bots don't learn to adapt.
    if (formData.get("botcheck")) {
      form.reset();
      setStatus("sent");
      return;
    }

    const service = String(formData.get("service") ?? "") || "General Enquiry";
    const name = String(formData.get("name") ?? "");

    // Give up after 15s so a stalled connection ends in a clear message
    // instead of a button stuck on "Sending…".
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          subject: `Website enquiry — ${service} — ${name}`,
          from_name: `${site.shortName} Website`,
          name,
          email: formData.get("email"),
          phone: formData.get("phone"),
          service,
          message: formData.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    // action/method/hidden fields make the form still send if someone clicks
    // before the page's JavaScript has finished loading (or JS is blocked).
    // Once loaded, handleSubmit takes over and submits in the background.
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-ink/8 bg-white p-8 shadow-sm sm:p-10"
    >
      <input type="hidden" name="access_key" value={site.web3formsAccessKey} />
      <input type="hidden" name="subject" value="Website enquiry" />
      <input type="hidden" name="from_name" value={`${site.shortName} Website`} />
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

      {/* Spam trap — hidden from people, ticked by bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="botcheck">Leave this box unticked</label>
        <input id="botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-electric px-6 py-4 text-sm font-bold text-white transition-all hover:bg-electric-dark hover:shadow-[0_8px_30px_-6px_rgba(36,87,255,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="size-4" /> {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>

      <div ref={feedbackRef} aria-live="polite" className="scroll-mt-32">
        {status === "sent" && (
          <p role="status" className="rounded-2xl bg-electric/10 px-4 py-3 text-center text-sm font-semibold text-electric-dark">
            Thanks — your enquiry has been sent. We&rsquo;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
            Sorry, your enquiry didn&rsquo;t go through. Please call{" "}
            <a href={site.phoneHref} className="underline">
              {site.phone}
            </a>{" "}
            or email{" "}
            <a href={site.emailHref} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
