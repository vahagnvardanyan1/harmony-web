import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { CATEGORY_TILES, categoryHref } from "@/lib/catalog/categories";
import { CATEGORIES } from "@/lib/catalog/types";

/* Arched photo per category — the arch nods to Armenian church doorways */
export const CategoryTiles = async () => {
  const t = await getTranslations("categories");

  return (
    <div className="grid grid-cols-2 gap-[clamp(12px,1.6vw,24px)] lg:grid-cols-4">
      {CATEGORIES.map((category) => (
        <Link key={category} href={categoryHref(category)} className="reveal group grid gap-4.5 text-center no-underline">
          <div className="relative aspect-3/4 overflow-hidden rounded-arch bg-tile">
            <Image
              src={CATEGORY_TILES[category]}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1800ms] ease-soft group-hover:scale-[1.06]"
            />
          </div>
          <span className="font-serif text-[1.35rem]">{t(`${category}.title`)}</span>
        </Link>
      ))}
    </div>
  );
};
