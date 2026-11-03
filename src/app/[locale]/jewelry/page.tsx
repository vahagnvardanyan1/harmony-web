import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ListingBanner } from "@/components/ListingBanner/ListingBanner";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { ALL_JEWELRY_BANNER } from "@/lib/catalog/categories";
import { PRODUCTS } from "@/lib/catalog/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("chrome.jewelry"), description: t("jewelry.lead") };
}

export default async function JewelryPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);

  return (
    <>
      <ListingBanner
        eyebrow={t("chrome.jewelry")}
        title={t("jewelry.title")}
        lead={t("jewelry.lead")}
        banner={ALL_JEWELRY_BANNER}
        crumbs={[
          { href: "/", label: "harmony" },
          { href: "/jewelry", label: t("chrome.jewelry") },
        ]}
      />
      <ProductGrid products={PRODUCTS} locale={locale} />
    </>
  );
}
