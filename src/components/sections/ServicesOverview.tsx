import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/lib/site";
import { iconMap } from "@/lib/icons";

export function ServicesOverview() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Electrical solutions for every project scale"
            description="From a single power point to a multi-site industrial shutdown, CR Electrics Australia delivers licensed electrical work across every sector."
          />
          <Link href="/services" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark sm:flex">
            View all services <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-ink/5 bg-mist p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-2xl hover:shadow-ink/20"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-electric text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors group-hover:text-white">
                  {service.cardTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 transition-colors group-hover:text-white/60">
                  {service.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-electric transition-colors group-hover:text-electric-light">
                  Learn more <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <Link href="/services" className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark sm:hidden">
          View all services <ArrowUpRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
