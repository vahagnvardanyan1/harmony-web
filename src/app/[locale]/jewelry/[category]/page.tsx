import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { ListingBanner } from "@/components/ListingBanner/ListingBanner";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { CATEGORY_BANNERS, categoryHref, isCategory } from "@/lib/catalog/categories";
import { productsIn } from "@/lib/catalog/queries";
import { CATEGORIES } from "@/lib/catalog/types";
import { breadcrumbJsonLd, productListJsonLd } from "@/lib/seo/listing-json-ld";
import { pageMetadata } from "@/lib/seo/page-metadata";

type CategoryPageProps = PageProps<"/[locale]/jewelry/[category]">;

export const generateStaticParams = () => CATEGORIES.map((category) => ({ category }));

/* Every real category is prerendered; only unknown ones render on request (and 404), so this page needs no shared instant shell */
export const instant = false;

const categoryFrom = async (params: CategoryPageProps["params"]) => {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  return category;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const [category, locale, t] = await Promise.all([categoryFrom(params), getLocale(), getTranslations("meta.categories")]);
  return pageMetadata({ path: categoryHref(category), locale, title: t(`${category}.title`), description: t(`${category}.description`) });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, locale, t] = await Promise.all([categoryFrom(params), getLocale(), getTranslations()]);
  const title = t(`categories.${category}.title`);
  const products = productsIn(category);
  const crumbs = [
    { href: "/", label: "harmony" },
    { href: "/jewelry", label: t("chrome.jewelry") },
  ];

  return (
    <>
      <JsonLd
        data={[breadcrumbJsonLd({ locale, crumbs: [...crumbs, { href: categoryHref(category), label: title }] }), productListJsonLd({ locale, name: title, products })]}
      />
      <ListingBanner
        eyebrow={t("chrome.jewelry")}
        title={title.toLowerCase()}
        lead={t("jewelry.lead")}
        banner={CATEGORY_BANNERS[category]}
        crumbs={crumbs}
        current={title}
      />
      <ProductGrid products={products} locale={locale} />
    </>
  );
}
