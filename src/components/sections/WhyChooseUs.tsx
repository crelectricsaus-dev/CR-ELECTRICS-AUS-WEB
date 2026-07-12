import { ShieldCheck, Clock3, Wrench, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Fully Licensed & Insured",
    description: "A-Grade Electrician and REC Licensed Electrical Contractor status means every job is legally compliant and fully covered.",
  },
  {
    icon: Wrench,
    title: "Domestic to Industrial Expertise",
    description: "One contractor for every scale of work — from a home safety inspection to a multi-site industrial shutdown.",
  },
  {
    icon: Clock3,
    title: "Reliable & On Schedule",
    description: "We plan around your business hours and deadlines, with clear communication from quote to completion.",
  },
  {
    icon: FileCheck2,
    title: "Compliance You Can Trust",
    description: "Thorough testing, documentation and certificates that satisfy Australian Standards, WorkSafe and insurers.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-mist py-24">
      <Container>
        <SectionHeading eyebrow="Why Choose Us" title="The trusted electrical partner for Melbourne" align="center" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-electric text-white transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
