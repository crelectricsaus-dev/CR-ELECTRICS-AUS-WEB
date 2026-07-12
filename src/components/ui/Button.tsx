import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-electric text-white hover:bg-electric-dark shadow-[0_0_0_0_rgba(36,87,255,0)] hover:shadow-[0_8px_30px_-6px_rgba(36,87,255,0.6)]",
  secondary: "bg-white text-ink hover:bg-mist",
  ghost: "bg-white/10 text-white hover:bg-white/20",
  "outline-light": "border border-white/30 text-white hover:bg-white hover:text-ink",
};

const sizes = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

export function Button({ href, children, variant = "primary", size = "md", icon = true, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {icon && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}
