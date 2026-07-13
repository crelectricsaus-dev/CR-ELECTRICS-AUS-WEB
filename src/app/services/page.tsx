import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { serviceCategories } from "@/lib/site";
import { iconMap } from "@/lib/icons";

const description =
  "Explore CR Electrics Australia's full range of electrical services: domestic, commercial, industrial, medical, security systems and testing & compliance across Melbourne and Victoria.";

export const metadata: Metadata = buildMetadata({
  title: "Electrical Services Melbourne",
  description,
  path: "/services",
  keywords: [
    "Electrical Services Melbourne",
    "Electrician Melbourne",
    "Commercial Electrical Contractor Victoria",
    "Industrial Electrical Contractor Victoria",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      <JsonLd data={collectionPageSchema({ name: "Electrical Services Melbourne", description, url: "/services" })} />
      <PageHero
        eyebrow="Our Services"
        title="Electrical services for every project, at every scale"
        description="Licensed electrical solutions across domestic, commercial, industrial and medical sectors — plus security systems and testing & compliance, all delivered by A-Grade qualified electricians."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]}
        photo="multimeterDiagnosis"
      />

      <section className="bg-white py-24">
        <Container>
          <div className="space-y-16">
            {serviceCategories.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div>
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-electric text-white">
                      <Icon className="size-7" />
                    </span>
                    <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-ink/65">{service.summary}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark"
                    >
                      Explore {service.cardTitle} <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                  <div className="rounded-3xl border border-ink/8 bg-mist p-8">
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink/70">
                          <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <WhyChooseUs />
      <CTABanner />
    </>
  );
}
