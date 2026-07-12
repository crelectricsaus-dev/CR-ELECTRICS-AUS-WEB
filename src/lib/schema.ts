import { site, faqs, type FaqItem } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#identity`,
    name: site.name,
    legalName: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo-full-ink.png`,
      width: 1033,
      height: 552,
    },
    image: `${site.url}/logo-full-ink.png`,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-AU",
    publisher: { "@id": `${site.url}/#identity` },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ElectricalContractor", "Electrician", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    image: `${site.url}/logo-full-ink.png`,
    logo: `${site.url}/logo-full-ink.png`,
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressLocality,
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      postalCode: site.postcode,
      addressCountry: site.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Melbourne" },
      { "@type": "State", name: "Victoria" },
      ...site.serviceAreas.map((area) => ({ "@type": "Place", name: area })),
    ],
    hasCredential: site.licences.map((l) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: l.title,
      description: l.description,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    parentOrganization: { "@id": `${site.url}/#identity` },
    sameAs: [],
  };
}

export function faqSchema(items: FaqItem[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  items?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.url}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Melbourne" },
      { "@type": "State", name: "Victoria" },
    ],
    ...(opts.items && opts.items.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.items.map((item, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: item,
              },
            })),
          },
        }
      : {}),
  };
}

export function collectionPageSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.url}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  };
}
