import Link from "next/link";
import { ArrowUpRight, Check, PhoneCall, ClipboardList, CalendarCheck, FileCheck2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { faqs, projects, serviceCategories, type ServiceCategory } from "@/lib/site";
import { iconMap } from "@/lib/icons";

const process = [
  { icon: PhoneCall, title: "Enquiry & Discussion", description: "Call or send an enquiry — we'll discuss your project scope, timeframe and requirements." },
  { icon: ClipboardList, title: "Obligation-Free Quote", description: "We provide a clear, itemised quote so you know exactly what's involved before work begins." },
  { icon: CalendarCheck, title: "Scheduled Work", description: "Our licensed electricians carry out the work to a schedule that suits your home or business." },
  { icon: FileCheck2, title: "Testing & Sign-Off", description: "Every job is tested, documented and signed off in line with Australian Standards." },
];

export function ServicePageTemplate({ service }: { service: ServiceCategory }) {
  const relevantFaqs = faqs.filter((f) => f.category === service.shortName || f.category === "General").slice(0, 6);
  const relevantProjects = projects.filter((p) => p.category === service.shortName).slice(0, 3);
  const fallbackProjects = relevantProjects.length ? relevantProjects : projects.slice(0, 3);
  const otherServices = serviceCategories.filter((s) => s.slug !== service.slug).slice(0, 3);
  const Icon = iconMap[service.icon];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.shortName, url: `/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.summary,
          url: `/services/${service.slug}`,
          items: service.items,
        })}
      />
      <JsonLd data={faqSchema(relevantFaqs)} />

      <PageHero
        eyebrow={service.tagline}
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortName, href: `/services/${service.slug}` },
        ]}
        photo={service.heroPhoto}
        photoSrc={`/images/hero-${service.slug}.jpg`}
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="What's Included" title={service.cardTitle} />
              <p className="mt-4 text-base leading-relaxed text-ink/60">
                Every {service.shortName.toLowerCase()} project is carried out by A-Grade licensed electricians,
                fully documented and compliant with current Australian Standards.
              </p>
              <span className="mt-8 hidden size-14 items-center justify-center rounded-2xl bg-electric text-white lg:flex">
                <Icon className="size-7" />
              </span>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-ink/8 bg-mist p-4">
                    <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                    <span className="text-sm font-medium text-ink/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24">
        <Container>
          <SectionHeading eyebrow="How It Works" title="A straightforward process, start to finish" align="center" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ icon: StepIcon, title, description }, i) => (
              <div key={title} className="relative rounded-2xl border border-ink/5 bg-white p-7">
                <span className="text-xs font-bold text-electric/50">STEP {i + 1}</span>
                <span className="mt-3 flex size-11 items-center justify-center rounded-xl bg-electric text-white">
                  <StepIcon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Related Work"
            title="Projects that showcase our standard"
            description={`A sample of ${service.shortName.toLowerCase()} and related electrical work delivered across Melbourne and Victoria.`}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallbackProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.shortName} electrical FAQs`} align="center" />
          <div className="mt-12">
            <FaqAccordion items={relevantFaqs} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow="Explore More" title="Other electrical services we provide" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {otherServices.map((other) => {
              const OtherIcon = iconMap[other.icon];
              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/8 bg-mist p-5 transition-colors hover:border-electric/30 hover:bg-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                      <OtherIcon className="size-5" />
                    </span>
                    <span className="text-sm font-semibold text-ink">{other.cardTitle}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-ink/40 transition-colors group-hover:text-electric" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner
        title={`Ready to start your ${service.shortName.toLowerCase()} project?`}
        description="Contact CR Electrics Australia today for an obligation-free quote."
      />
    </>
  );
}
