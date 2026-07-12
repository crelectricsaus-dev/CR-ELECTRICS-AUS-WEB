import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { LicensingSection } from "@/components/sections/LicensingSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { StatsSection } from "@/components/sections/StatsSection";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Licensed Electrician Melbourne & Victoria",
  description:
    "CR Electrics Australia is a licensed A-Grade electrician and REC registered electrical contractor based in Mill Park, servicing Melbourne and all of Victoria. Domestic, commercial, industrial, medical & security electrical services.",
  path: "/",
  keywords: [
    "Electrician Melbourne",
    "Licensed Electrician Melbourne",
    "Electrical Contractor Melbourne",
    "Mill Park Electrician",
    "Commercial Electrician Melbourne",
    "Industrial Electrician Melbourne",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }])} />
      <HomeHero />
      <TrustBar />
      <ServicesOverview />
      <StatsSection />
      <WhyChooseUs />
      <LicensingSection />
      <IndustriesStrip />
      <FeaturedProjects />
      <TestimonialsCarousel />
      <ServiceAreas />
      <CTABanner />
    </>
  );
}
