import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { categoryHref } from "@/lib/catalog/categories";
import { CATEGORIES } from "@/lib/catalog/types";
import { languageAlternates, localizedUrl } from "@/lib/seo/urls";

/*
 * Pages only, no image entries: pages render photos through /_next/image, so listing the original files would
 * name each photo by a second URL, and pop-up photos have no page of their own for Google Images to land on
 */
const PATHS = ["/", "/jewelry", ...CATEGORIES.map(categoryHref)];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl({ path, locale }),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
