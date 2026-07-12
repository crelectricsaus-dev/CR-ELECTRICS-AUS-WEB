import Link from "next/link";
import Image from "next/image";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="CR Electrics Australia home">
      <Image
        src="/logo-icon-white.png"
        alt=""
        width={40}
        height={40}
        priority
        className={`size-10 shrink-0 ${variant === "dark" ? "invert" : ""}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${variant === "light" ? "text-white" : "text-ink"}`}>
          CR ELECTRICS
        </span>
        <span className="text-[10px] font-semibold tracking-[0.3em] text-electric-light">AUSTRALIA</span>
      </span>
    </Link>
  );
}
