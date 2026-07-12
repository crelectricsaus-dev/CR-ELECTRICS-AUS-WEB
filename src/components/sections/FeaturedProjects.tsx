import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/lib/site";

export function FeaturedProjects() {
  return (
    <section className="bg-mist py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured projects across Victoria"
            description="A selection of commercial, industrial, medical and residential projects delivered by our team."
          />
          <Link href="/projects" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark sm:flex">
            View all projects <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="/projects" className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-electric hover:text-electric-dark sm:hidden">
          View all projects <ArrowUpRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
