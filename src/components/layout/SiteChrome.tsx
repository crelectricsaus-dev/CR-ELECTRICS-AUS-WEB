"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { FloatingQuoteButton } from "@/components/layout/FloatingQuoteButton";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTool = pathname?.startsWith("/quotes");

  if (isTool) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <StickyMobileBar />
      <FloatingQuoteButton />
    </>
  );
}
