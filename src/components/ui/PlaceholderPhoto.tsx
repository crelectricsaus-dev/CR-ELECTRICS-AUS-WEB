import clsx from "clsx";
import { type LucideIcon, Zap } from "lucide-react";

export function PlaceholderPhoto({
  icon: Icon = Zap,
  label,
  className,
}: {
  icon?: LucideIcon;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-ink to-charcoal-2",
        className
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-electric/30 blur-3xl" />
      <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-electric-light/10 blur-2xl" />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-electric-light backdrop-blur-sm">
          <Icon className="size-7" />
        </span>
        {label && <span className="max-w-[14rem] text-xs font-semibold uppercase tracking-wider text-white/40">{label}</span>}
      </div>
    </div>
  );
}
