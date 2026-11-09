import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Quoting Tool",
    template: "%s | CR Electrics Quoting Tool",
  },
  robots: { index: false, follow: false },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/quotes" className="group flex items-center gap-2.5">
            <Image src="/logo-icon-white.png" alt="" width={30} height={30} className="size-7 shrink-0 sm:size-8" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-extrabold tracking-tight text-white sm:text-base">
                CR ELECTRICS
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.2em] text-electric-light">
                <Zap className="size-2.5 fill-electric-light" /> QUOTING TOOL
              </span>
            </span>
          </Link>
          <Link
            href="/quotes"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
