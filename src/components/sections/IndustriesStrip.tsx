import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/lib/site";
import { iconMap } from "@/lib/icons";

export function IndustriesStrip() {
  return (
    <section className="bg-ink py-24">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Trusted across Victoria's key industries"
          description="Our electricians bring sector-specific knowledge to every install, upgrade and maintenance program."
          dark
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon];
            return (
              <div
                key={industry.name}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 p-6 transition-colors duration-300 hover:border-electric/40 hover:bg-white/5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-electric-light transition-colors group-hover:bg-electric group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="font-display text-sm font-bold text-white">{industry.name}</h3>
                <p className="text-xs leading-relaxed text-white/50">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
