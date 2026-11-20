import type { Locale } from "next-intl";
import type { BreadcrumbList, ItemList, WithContext } from "schema-dts";

import { cardPhotos } from "@/lib/catalog/photos";
import type { Product } from "@/lib/catalog/types";

import { absoluteUrl, localizedUrl } from "./urls";

type Crumb = { href: string; label: string };

/* The trail ends with the page itself, which Google shows in place of the bare URL */
export const breadcrumbJsonLd = ({ locale, crumbs }: { locale: Locale; crumbs: readonly Crumb[] }): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map(({ href, label }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: label,
    item: localizedUrl({ path: href, locale }),
  })),
});

/* Pieces have no pages of their own (and no prices), so each entry is a name and its studio photo, not a Product */
export const productListJsonLd = ({ locale, name, products }: { locale: Locale; name: string; products: readonly Product[] }): WithContext<ItemList> => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name[locale],
    image: absoluteUrl(cardPhotos(product).cover),
  })),
});
