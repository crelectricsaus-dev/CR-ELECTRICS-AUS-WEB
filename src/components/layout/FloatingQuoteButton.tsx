"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall } from "lucide-react";

export function FloatingQuoteButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the contact page this just links back to the same page, and it floats
  // over the form's Send button — so it's hidden there.
  if (pathname?.startsWith("/contact")) return null;

  return (
    <Link
      href="/contact"
      className={`fixed bottom-8 right-8 z-50 hidden items-center gap-2 rounded-full bg-electric px-6 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-8px_rgba(36,87,255,0.7)] transition-all duration-300 hover:bg-electric-dark lg:flex ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <PhoneCall className="size-4" />
      Request a Free Quote
    </Link>
  );
}
