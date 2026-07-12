import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { mainNav, serviceNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="CR Electrics Australia home" className="inline-block">
              <Image src="/logo-full-white.png" alt="CR Electrics Australia" width={1033} height={552} className="h-16 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Licensed electrical contractor based in Mill Park, proudly servicing Melbourne and Victoria
              with premium domestic, commercial and industrial electrical solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80">
                <ShieldCheck className="size-3.5 text-electric-light" /> A-Grade Electrician
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80">
                <ShieldCheck className="size-3.5 text-electric-light" /> REC Licensed Contractor
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Company</h3>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-electric-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Services</h3>
            <ul className="mt-4 space-y-3">
              {serviceNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-electric-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 text-sm text-white/80 hover:text-electric-light">
                  <Phone className="mt-0.5 size-4 shrink-0 text-electric-light" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-start gap-3 text-sm text-white/80 hover:text-electric-light">
                  <Mail className="mt-0.5 size-4 shrink-0 text-electric-light" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-electric-light" /> {site.fullAddress}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/45">
            Servicing Melbourne (primary) and all of Victoria (secondary), with availability for interstate
            commercial and industrial projects. Licensed A-Grade Electrician &amp; REC Registered Electrical
            Contractor.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <span>Mill Park, VIC 3082</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
