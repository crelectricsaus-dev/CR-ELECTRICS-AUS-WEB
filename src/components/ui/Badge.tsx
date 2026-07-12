import clsx from "clsx";
import { LucideIcon } from "lucide-react";

export function Badge({
  icon: Icon,
  children,
  dark = false,
  className,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider",
        dark ? "glass text-white" : "border border-ink/10 bg-mist text-ink",
        className
      )}
    >
      {Icon && <Icon className="size-3.5 text-electric" />}
      {children}
    </span>
  );
}
