"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { useOpenGallery } from "@/hooks/useOpenGallery";

type ProductCardProps = {
  name: string;
  photos: readonly string[];
  cover: string;
  /* Shown on hover where the device has one */
  hover?: string;
  isNew?: boolean;
  sizes: string;
};

const PHOTO = "object-cover transition-[opacity,transform] duration-[900ms,1800ms] ease-soft group-hover:scale-[1.04]";

/* A product is its photos: clicking opens all of them in the pop-up */
export const ProductCard = ({ name, photos, cover, hover, isNew, sizes }: ProductCardProps) => {
  const t = useTranslations("gallery");
  const openGallery = useOpenGallery();

  return (
    <article className="reveal">
      <button
        type="button"
        aria-label={name}
        onClick={() => openGallery({ label: name, photos })}
        className="group relative block aspect-3/4 w-full cursor-zoom-in overflow-hidden bg-tile"
      >
        <Image src={cover} alt="" fill sizes={sizes} className={PHOTO} />
        {hover ? <Image src={hover} alt="" fill sizes={sizes} className={`${PHOTO} opacity-0 group-hover:opacity-100`} /> : null}
        {isNew ? (
          <span className="absolute left-3.5 top-3.5 z-10 bg-ivory/85 px-2.5 py-1.25 text-[9px] font-semibold uppercase tracking-[.3em] text-charcoal backdrop-blur-sm">
            {t("isNew")}
          </span>
        ) : null}
      </button>
    </article>
  );
};
