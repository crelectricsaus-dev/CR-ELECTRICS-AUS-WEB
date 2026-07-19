import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds consistent per-page metadata: canonical URL, and matching
 * Open Graph / Twitter tags (Next's title template only affects the
 * <title> tag, not openGraph/twitter, so those are set explicitly here).
 */
export function buildMetadata(opts: {
  title?: string;
  /** Renders the <title> tag exactly as given, bypassing the " | Site Name" template. */
  absoluteTitle?: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = opts.absoluteTitle ?? `${opts.title} | ${site.name}`;
  const url = `${site.url}${opts.path}`;

  return {
    title: opts.absoluteTitle ? { absolute: opts.absoluteTitle } : opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url,
      siteName: site.name,
      title: fullTitle,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
    },
  };
}
