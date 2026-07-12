import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FaqPageContent } from "@/components/sections/FaqPageContent";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about CR Electrics Australia's licensing, service areas, and domestic, commercial, industrial, testing and security electrical services.",
  path: "/faq",
  keywords: ["Electrician Melbourne FAQ", "Electrical Compliance Melbourne", "Licensed Electrician Melbourne"],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }])} />
      <JsonLd data={faqSchema()} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to the questions we hear most from homeowners, businesses and industrial clients across Melbourne and Victoria."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]}
      />
      <FaqPageContent />
      <CTABanner title="Can't find your answer?" description="Call us directly or send an enquiry and we'll get back to you promptly." />
    </>
  );
}
