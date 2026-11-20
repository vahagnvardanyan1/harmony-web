import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { ListingBanner } from "@/components/ListingBanner/ListingBanner";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { ALL_JEWELRY_BANNER } from "@/lib/catalog/categories";
import { PRODUCTS } from "@/lib/catalog/products";
import { breadcrumbJsonLd, productListJsonLd } from "@/lib/seo/listing-json-ld";
import { pageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("meta.jewelry")]);
  return pageMetadata({ path: "/jewelry", locale, title: t("title"), description: t("description") });
}

export default async function JewelryPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
  const crumbs = [
    { href: "/", label: "harmony" },
    { href: "/jewelry", label: t("chrome.jewelry") },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd({ locale, crumbs }), productListJsonLd({ locale, name: t("jewelry.title"), products: PRODUCTS })]} />
      <ListingBanner
        eyebrow={t("chrome.jewelry")}
        title={t("jewelry.title")}
        lead={t("jewelry.lead")}
        banner={ALL_JEWELRY_BANNER}
        crumbs={crumbs}
      />
      <ProductGrid products={PRODUCTS} locale={locale} />
    </>
  );
}
