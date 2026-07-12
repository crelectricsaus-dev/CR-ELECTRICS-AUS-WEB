import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CTABanner({
  title = "Ready to start your project?",
  description = "Get a fast, obligation-free quote from Melbourne's licensed electrical specialists.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-electric py-20">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ink/20 blur-3xl" />
      <Container className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-base text-white/85">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <Phone className="size-4" /> {site.phone}
          </a>
          <Button href="/contact" variant="secondary" size="lg">
            Request a Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
