import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { iconMap } from "@/lib/icons";
import type { Project } from "@/lib/site";

const categoryIcon: Record<Project["category"], keyof typeof iconMap> = {
  Commercial: "Building2",
  Industrial: "Factory",
  Medical: "HeartPulse",
  Residential: "Home",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10">
      <div className="relative h-56 overflow-hidden">
        <PlaceholderPhoto
          icon={iconMap[categoryIcon[project.category]]}
          label={project.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-electric">{project.location}</div>
        <h3 className="mt-2 font-display text-lg font-bold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.scope.slice(0, 3).map((s) => (
            <li key={s} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink/60">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
