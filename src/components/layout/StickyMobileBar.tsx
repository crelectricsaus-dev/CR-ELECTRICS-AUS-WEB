"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageSquareText } from "lucide-react";
import { site } from "@/lib/site";

export function StickyMobileBar() {
  const pathname = usePathname();

  // On the contact page "Get a Quote" just links back to the same page, and the
  // bar sits over the form's Send button — so it's hidden there (the phone
  // number is already shown at the top of that page).
  if (pathname?.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden">
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold text-white"
      >
        <Phone className="size-4 text-electric-light" /> Call Now
      </a>
      <div className="w-px bg-white/10" />
      <a
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 bg-electric py-4 text-sm font-bold text-white"
      >
        <MessageSquareText className="size-4" /> Get a Quote
      </a>
    </div>
  );
}
