"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { mainNav, serviceNav, site } from "@/lib/site";
import clsx from "clsx";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-ink/40 backdrop-blur-sm"
      )}
    >
      <div className="hidden items-center justify-end gap-6 border-b border-white/10 bg-black/30 px-6 py-1.5 text-xs text-white/70 lg:flex">
        <span>{site.fullAddress}</span>
        <span className="h-3 w-px bg-white/20" />
        <a href={site.emailHref} className="hover:text-white">{site.email}</a>
        <span className="h-3 w-px bg-white/20" />
        <span className="font-semibold text-electric-light">A-Grade Licensed &amp; REC Registered</span>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.label === "Services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  <ChevronDown className="size-3.5" />
                </Link>
                <div
                  className={clsx(
                    "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                    servicesOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                  )}
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-charcoal p-3 shadow-2xl shadow-black/40">
                    {serviceNav.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                      >
                        <div className="text-sm font-semibold text-white">{s.label}</div>
                        <div className="mt-0.5 text-xs text-white/55">{s.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            <Phone className="size-4 text-electric-light" />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-electric-dark hover:shadow-[0_8px_24px_-4px_rgba(36,87,255,0.6)]"
          >
            Request a Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={clsx(
          "overflow-hidden bg-ink transition-[max-height] duration-300 ease-out lg:hidden",
          mobileOpen ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 pb-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3">
            {serviceNav.map((s) => (
              <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5">
                {s.label}
              </Link>
            ))}
          </div>
          <a href={site.phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white">
            <Phone className="size-4 text-electric-light" /> {site.phone}
          </a>
          <Link href="/contact" className="mt-2 flex items-center justify-center rounded-full bg-electric px-4 py-3 text-sm font-semibold text-white">
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
