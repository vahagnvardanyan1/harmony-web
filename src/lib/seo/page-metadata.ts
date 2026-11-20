import type { Metadata } from "next";
import type { Locale } from "next-intl";

import { routing } from "@/i18n/routing";

import { languageAlternates, localizedUrl } from "./urls";

const OPEN_GRAPH_LOCALES = { en: "en_US", hy: "hy_AM", ru: "ru_RU" } as const satisfies Record<Locale, string>;

export const SHARE_IMAGE = { url: "/brand/og-image.png", width: 1200, height: 630, alt: "harmony gold jewelry" };

type PageMetadataArgs = { path: string; locale: Locale; title: string; description: string };

/* Metadata merges shallowly, so a page that sets openGraph must repeat the share image and site name */
export const pageMetadata = ({ path, locale, title, description }: PageMetadataArgs): Metadata => {
  const url = localizedUrl({ path, locale });

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: "harmony",
      title,
      description,
      url,
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: routing.locales.filter((other) => other !== locale).map((other) => OPEN_GRAPH_LOCALES[other]),
      images: [SHARE_IMAGE],
    },
  };
};
