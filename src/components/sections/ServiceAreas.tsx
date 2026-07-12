import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function ServiceAreas() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Where We Work"
              title="Proudly local, servicing all of Victoria"
              description={`Based in ${site.fullAddress}, our primary service area is ${site.primaryArea} with work carried out across ${site.secondaryArea}. We're also available for interstate commercial and industrial projects.`}
            />
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-mist p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                <MapPin className="size-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-ink">Home Base</div>
                <div className="text-sm text-ink/60">{site.fullAddress}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-2.5">
              {site.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-ink/8 bg-mist px-4 py-2 text-sm font-medium text-ink/75"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
