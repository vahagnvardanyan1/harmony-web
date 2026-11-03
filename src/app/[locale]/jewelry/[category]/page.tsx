import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { ListingBanner } from "@/components/ListingBanner/ListingBanner";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { CATEGORY_BANNERS, isCategory } from "@/lib/catalog/categories";
import { productsIn } from "@/lib/catalog/queries";
import { CATEGORIES } from "@/lib/catalog/types";

type CategoryPageProps = PageProps<"/[locale]/jewelry/[category]">;

export const generateStaticParams = () => CATEGORIES.map((category) => ({ category }));

const categoryFrom = async (params: CategoryPageProps["params"]) => {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  return category;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const [category, t] = await Promise.all([categoryFrom(params), getTranslations("categories")]);
  return { title: t(`${category}.title`), description: t(`${category}.lead`) };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [category, locale, t] = await Promise.all([categoryFrom(params), getLocale(), getTranslations()]);
  const title = t(`categories.${category}.title`);

  return (
    <>
      <ListingBanner
        eyebrow={t("chrome.jewelry")}
        title={title.toLowerCase()}
        lead={t("jewelry.lead")}
        banner={CATEGORY_BANNERS[category]}
        crumbs={[
          { href: "/", label: "harmony" },
          { href: "/jewelry", label: t("chrome.jewelry") },
        ]}
        current={title}
      />
      <ProductGrid products={productsIn(category)} locale={locale} />
    </>
  );
}
