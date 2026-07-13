import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact CR Electrics Australia for a free quote. Call 0434 353 334, email crelectricsaus@gmail.com, or send an enquiry. Servicing Melbourne and all of Victoria.",
  path: "/contact",
  keywords: ["Contact Electrician Melbourne", "Mill Park Electrician", "Electrician Near Me Melbourne"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
      <PageHero
        eyebrow="Get In Touch"
        title="Let's talk about your project"
        description="Call, email or send an enquiry below — we respond promptly and provide obligation-free quotes for domestic, commercial and industrial work."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <a href={site.phoneHref} className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-mist p-6 transition-colors hover:border-electric/30">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/50">Call Us</div>
                    <div className="mt-1 font-display text-lg font-bold text-ink">{site.phone}</div>
                  </div>
                </a>
                <a href={site.emailHref} className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-mist p-6 transition-colors hover:border-electric/30">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/50">Email Us</div>
                    <div className="mt-1 font-display text-lg font-bold text-ink break-all">{site.email}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-mist p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/50">Based In</div>
                    <div className="mt-1 font-display text-lg font-bold text-ink">{site.fullAddress}</div>
                    <div className="mt-1 text-sm text-ink/55">
                      Servicing {site.primaryArea} &amp; all of {site.secondaryArea}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-mist p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                    <Clock className="size-5" />
                  </span>
                  <div className="w-full">
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/50">Business Hours</div>
                    <div className="mt-2 space-y-1.5">
                      {site.hours.map((h) => (
                        <div key={h.day} className="flex justify-between gap-4 text-sm text-ink/70">
                          <span className="font-medium">{h.day}</span>
                          <span className="text-right">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-ink/8">
                <iframe
                  title="CR Electrics Australia location map"
                  src="https://maps.google.com/maps?q=Mill%20Park%20VIC%203082%20Australia&t=&z=8&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
