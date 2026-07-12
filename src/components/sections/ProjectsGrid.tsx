"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects, type Project } from "@/lib/site";

const categories: Array<Project["category"] | "All"> = ["All", "Commercial", "Industrial", "Medical", "Residential"];

export function ProjectsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={clsx(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                active === cat ? "bg-electric text-white" : "bg-mist text-ink/70 hover:bg-ink/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
