import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { CategoryFeature } from "@/components/CategoryFeature/CategoryFeature";
import { CategoryTiles } from "@/components/CategoryTiles/CategoryTiles";
import { FilmHero } from "@/components/FilmHero/FilmHero";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Rail } from "@/components/Rail/Rail";
import { SectionHead } from "@/components/SectionHead/SectionHead";
import { Eyebrow, Title } from "@/components/Typography/Typography";
import { VisitSection } from "@/components/VisitSection/VisitSection";
import { CATEGORY_BANNERS, categoryHref } from "@/lib/catalog/categories";
import { cardPhotos, photosOf } from "@/lib/catalog/photos";
import { newInProducts, productsIn } from "@/lib/catalog/queries";
import { CATEGORIES } from "@/lib/catalog/types";

const SECTION_SPACING = "py-[clamp(80px,11vw,160px)]";

export default async function HomePage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);

  return (
    <>
      <FilmHero>
        <div className="animate-rise">
          <Eyebrow>{t("home.heroEyebrow")}</Eyebrow>
        </div>
        <div className="animate-rise [animation-delay:150ms]">
          <Title as="h1" size="xl" id="hero-title">
            {t.rich("home.heroTitle", {
              logo: () => <Image src="/brand/harmony-icon-gold.svg" alt="o" width={70} height={70} className="inline-block size-[.7em] align-[-.02em]" />,
            })}
          </Title>
        </div>
        <div className="mt-10 animate-rise [animation-delay:300ms]">
          <ButtonLink href="/jewelry" tone="gold">
            {t("home.heroCta")}
          </ButtonLink>
        </div>
      </FilmHero>

      <section aria-labelledby="new-title" className={`band-light-2 ${SECTION_SPACING}`}>
        <div className="wrap">
          <SectionHead id="new-title" eyebrow={t("home.newEyebrow")} title={t("home.newTitle")} link={{ href: "/jewelry", label: t("home.seeAllJewelry") }} />
          <Rail>
            {newInProducts().map((product) => (
              <ProductCard
                key={product.id}
                name={product.name[locale]}
                photos={photosOf(product)}
                {...cardPhotos(product)}
                isNew={product.isNew}
                sizes="(max-width: 768px) 74vw, 25vw"
              />
            ))}
          </Rail>
        </div>
      </section>

      <section aria-labelledby="types-title" className={`band-light ${SECTION_SPACING}`}>
        <div className="wrap">
          <SectionHead id="types-title" eyebrow={t("home.typesEyebrow")} title={t("home.typesTitle")} link={{ href: "/jewelry", label: t("home.seeAllJewelry") }} />
          <CategoryTiles />
        </div>
      </section>

      {CATEGORIES.map((category, index) => (
        <CategoryFeature
          key={category}
          id={`feature-${category}`}
          title={t(`categories.${category}.title`)}
          lead={t(`categories.${category}.lead`)}
          link={{ href: categoryHref(category), label: t("home.seeAll") }}
          banner={CATEGORY_BANNERS[category]}
          pieces={productsIn(category).slice(0, 3)}
          locale={locale}
          reversed={index % 2 === 1}
        />
      ))}

      <VisitSection />
    </>
  );
}
