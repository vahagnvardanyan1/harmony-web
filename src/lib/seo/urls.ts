import type { Locale } from "next-intl";

import { SITE_URL } from "@/constants/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/* Absolute, because the sitemap and JSON-LD have no metadataBase to resolve against */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const localizedUrl = ({ path, locale }: { path: string; locale: Locale }) => absoluteUrl(getPathname({ href: path, locale }));

/* Every language version of a locale-less path, plus x-default for visitors in other languages */
export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl({ path, locale })])),
  "x-default": localizedUrl({ path, locale: routing.defaultLocale }),
});
