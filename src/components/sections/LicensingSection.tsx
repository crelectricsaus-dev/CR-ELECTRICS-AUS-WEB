import { ShieldCheck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const icons = [ShieldCheck, BadgeCheck];

export function LicensingSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Fully Licensed"
          title="Credentials you can verify, work you can trust"
          description="Every job carried out by CR Electrics Australia is backed by the licences and insurance required to work legally and safely across Victoria."
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {site.licences.map((licence, i) => {
            const Icon = icons[i];
            return (
              <div
                key={licence.title}
                className="relative overflow-hidden rounded-3xl bg-ink p-10"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/25 blur-3xl" />
                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-electric text-white">
                  <Icon className="size-7" />
                </span>
                <h3 className="relative mt-6 font-display text-xl font-bold text-white">{licence.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/60">{licence.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
