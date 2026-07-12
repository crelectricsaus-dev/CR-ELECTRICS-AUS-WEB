import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { serviceCategories } from "@/lib/site";

const service = serviceCategories.find((s) => s.slug === "commercial-electrical")!;

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle.split(" | ")[0],
  description: service.metaDescription,
  path: `/services/${service.slug}`,
  keywords: service.heroKeywords,
});

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
