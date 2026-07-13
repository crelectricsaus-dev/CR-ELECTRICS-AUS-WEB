import type { Metadata } from "next";
import { ShieldCheck, Award, Users, Target, HeartHandshake, Wrench } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about CR Electrics Australia — a licensed A-Grade electrician and REC registered electrical contractor based in Mill Park, delivering safe, compliant electrical work across Melbourne and Victoria.",
  path: "/about",
  keywords: ["Electrician Melbourne", "Mill Park Electrician", "Licensed Electrical Contractor Victoria"],
});

const values = [
  { icon: ShieldCheck, title: "Safety First", description: "Every job is planned and executed to Australian Standards, with safety as the non-negotiable foundation of our work." },
  { icon: Target, title: "Attention to Detail", description: "From the first site visit to final testing, we sweat the details others overlook — because that's where quality lives." },
  { icon: HeartHandshake, title: "Long-Term Relationships", description: "Many of our commercial and industrial clients have trusted us for repeat work and ongoing maintenance year after year." },
  { icon: Wrench, title: "Quality Workmanship", description: "Tidy, compliant, built-to-last electrical work — whether it's a single power point or a full site fit out." },
  { icon: Award, title: "Licensed Professionals", description: "A-Grade licensed and REC registered, our qualifications mean your project is in fully compliant, legally accountable hands." },
  { icon: Users, title: "Commercial & Industrial Expertise", description: "We understand the pace, compliance and communication commercial and industrial clients demand." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <PageHero
        eyebrow="About CR Electrics Australia"
        title="Melbourne electrical expertise, built on trust"
        description="CR Electrics Australia is a licensed electrical contractor based in Mill Park, proudly delivering domestic, commercial, industrial and medical electrical solutions across Melbourne and Victoria."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
        photo="pendantLighting"
      />

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="A licensed electrical contractor built on reliability"
              />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/65">
                <p>
                  CR Electrics Australia was founded on a simple principle: electrical work should be safe,
                  compliant and done right the first time. Based in {site.fullAddress}, we&rsquo;ve grown into
                  a trusted electrical contractor serving homeowners, businesses and industrial operators
                  across {site.primaryArea} and {site.secondaryArea}.
                </p>
                <p>
                  As an A-Grade licensed electrician and REC Registered Electrical Contractor, we hold the
                  qualifications and legal accountability required to take on projects of any scale — from a
                  single residential safety inspection to multi-site commercial maintenance contracts and
                  industrial shutdown works.
                </p>
                <p>
                  We&rsquo;re also available for interstate commercial and industrial projects, bringing the
                  same standard of professionalism, documentation and workmanship wherever the job takes us.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-3xl bg-ink p-8">
                <h3 className="font-display text-lg font-bold text-white">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  To deliver electrical work that Melbourne homeowners and businesses can trust completely —
                  safe, compliant, and finished to the highest standard, every time.
                </p>
              </div>
              {site.licences.map((l) => (
                <div key={l.title} className="rounded-3xl border border-ink/8 bg-mist p-6">
                  <ShieldCheck className="size-6 text-electric" />
                  <h3 className="mt-4 font-display text-sm font-bold text-ink">{l.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <StatsSection />

      <section className="bg-mist py-24">
        <Container>
          <SectionHeading eyebrow="What We Stand For" title="The values behind every job" align="center" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-ink/5 bg-white p-7 transition-shadow hover:shadow-xl hover:shadow-ink/5">
                <span className="flex size-12 items-center justify-center rounded-xl bg-electric text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsCarousel />
      <CTABanner
        title="Work with a licensed electrical partner you can trust"
        description="Get in touch to discuss your domestic, commercial or industrial project."
      />
    </>
  );
}
