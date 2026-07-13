import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const description =
  "Explore commercial, industrial, medical and residential electrical projects completed by CR Electrics Australia across Melbourne and Victoria.";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description,
  path: "/projects",
  keywords: ["Electrician Melbourne Projects", "Commercial Electrical Projects Melbourne", "Industrial Electrical Projects Victoria"],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Projects", url: "/projects" }])} />
      <JsonLd data={collectionPageSchema({ name: "Projects", description, url: "/projects" })} />
      <PageHero
        eyebrow="Our Work"
        title="Projects across Melbourne & Victoria"
        description="A showcase of commercial, industrial, medical and residential electrical projects delivered by CR Electrics Australia."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]}
        photo="melbourneSkyline"
      />
      <ProjectsGrid />
      <CTABanner title="Have a project in mind?" description="Tell us about your job and we'll provide an obligation-free quote." />
    </>
  );
}
