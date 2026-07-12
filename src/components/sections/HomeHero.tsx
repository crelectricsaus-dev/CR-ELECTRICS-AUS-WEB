import { Phone, ShieldCheck, BadgeCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroPhoto } from "@/components/ui/HeroPhoto";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-24 pt-14 sm:pb-32 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <HeroPhoto
          src="/images/hero-home.jpg"
          alt=""
          placeholder="luxuryHome"
          className="object-[70%_55%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
      </div>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_70%_70%_at_30%_20%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[28rem] w-[28rem] rounded-full bg-electric/20 blur-[140px]" />

      <Container className="relative">
        <div className="max-w-3xl">
          <div className="flex animate-fade-up flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white">
              <ShieldCheck className="size-3.5 text-electric-light" /> A-Grade Licensed Electrician
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white">
              <BadgeCheck className="size-3.5 text-electric-light" /> REC Registered Contractor
            </span>
          </div>

          <h1
            className="animate-fade-up mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ animationDelay: "0.05s" }}
          >
            Melbourne&rsquo;s Premium Electrical Contractor
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
            style={{ animationDelay: "0.15s" }}
          >
            Domestic, commercial, industrial and medical electrical solutions delivered with precision,
            compliance and reliability across all of Melbourne and Victoria.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.25s" }}>
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-ink transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/30"
            >
              <Phone className="size-4.5" /> Call {site.phone}
            </a>
            <Button href="/contact" size="lg">
              Request a Free Quote
            </Button>
          </div>

          <div
            className="animate-fade-up mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-electric-light text-electric-light" />
              ))}
              <span className="ml-2 text-sm font-semibold text-white/80">5.0 rated by clients</span>
            </div>
            <div className="text-sm font-semibold text-white/60">Trusted Licensed Electrician</div>
            <div className="text-sm font-semibold text-white/60">24/7 Emergency Response</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
