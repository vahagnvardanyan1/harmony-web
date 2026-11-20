import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { categoryHref } from "@/lib/catalog/categories";
import { CATEGORIES } from "@/lib/catalog/types";
import { localizedUrl } from "@/lib/seo/urls";

/*
 * Plain page URLs only. No image entries: pages render photos through /_next/image, so the original files would be
 * a second URL per photo. No hreflang alternates: every page already declares them in its <head> and the Link header,
 * and Google treats the three methods as equivalent. No lastmod, changefreq or priority: Google ignores the last two
 * and trusts lastmod only when it is accurate, which a static catalog cannot provide.
 */
const PATHS = ["/", "/jewelry", ...CATEGORIES.map(categoryHref)];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({ url: localizedUrl({ path, locale }) })),
  );
}
