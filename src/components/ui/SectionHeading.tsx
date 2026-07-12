import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-px w-8 bg-electric" />
          <span className={clsx("text-xs font-bold uppercase tracking-[0.25em]", dark ? "text-electric-light" : "text-electric")}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className={clsx("font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p className={clsx("mt-4 text-lg leading-relaxed", dark ? "text-white/70" : "text-ink/65")}>{description}</p>
      )}
    </div>
  );
}
