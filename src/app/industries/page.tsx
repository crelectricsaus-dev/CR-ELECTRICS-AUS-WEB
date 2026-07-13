import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { industries } from "@/lib/site";
import { iconMap } from "@/lib/icons";

const description =
  "CR Electrics Australia delivers licensed electrical services across residential, retail, commercial, warehousing, manufacturing, healthcare, hospitality, education and construction sectors in Melbourne and Victoria.";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description,
  path: "/industries",
  keywords: ["Commercial Electrical Contractor Victoria", "Industrial Electrical Contractor Victoria", "Electrician Melbourne"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Industries", url: "/industries" }])} />
      <JsonLd data={collectionPageSchema({ name: "Industries We Serve", description, url: "/industries" })} />
      <PageHero
        eyebrow="Industries"
        title="Electrical expertise across every industry"
        description="From homes to hospitals, retail stores to manufacturing plants, our licensed electricians bring sector-specific knowledge to every project across Melbourne and Victoria."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Industries", href: "/industries" }]}
        photo="warehouseWorkers"
      />

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Who We Work With"
            title="Sector-specific electrical solutions"
            description="Every industry has different compliance requirements, timelines and operational pressures. We adapt our approach to fit yours."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = iconMap[industry.icon];
              return (
                <div
                  key={industry.name}
                  className="group rounded-3xl border border-ink/5 bg-mist p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-2xl hover:shadow-ink/10"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-electric text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold text-ink transition-colors group-hover:text-white">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60 transition-colors group-hover:text-white/60">
                    {industry.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark">
              View our full range of services <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <FeaturedProjects />
      <CTABanner title="Looking for an electrician who understands your industry?" description="Get in touch to discuss your sector's specific electrical requirements." />
    </>
  );
}
