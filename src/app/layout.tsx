import type { Metadata, Viewport } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { FloatingQuoteButton } from "@/components/layout/FloatingQuoteButton";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Licensed Electrician Melbourne & Victoria`,
    template: `%s | ${site.name}`,
  },
  description:
    "Licensed A-Grade electrician and REC registered electrical contractor servicing Melbourne and all of Victoria. Domestic, commercial, industrial, medical, security & compliance services.",
  keywords: [
    "Electrician Melbourne",
    "Commercial Electrician Melbourne",
    "Industrial Electrician Melbourne",
    "Licensed Electrician Melbourne",
    "Electrical Contractor Melbourne",
    "Mill Park Electrician",
    "Testing and Tagging Melbourne",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Licensed Electrician Melbourne & Victoria`,
    description:
      "Licensed A-Grade electrician and REC registered electrical contractor servicing Melbourne and all of Victoria.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Licensed Electrician Melbourne & Victoria`,
    description:
      "Licensed A-Grade electrician and REC registered electrical contractor servicing Melbourne and all of Victoria.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-electric focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
