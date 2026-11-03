import Image from "next/image";

import { ProductCard } from "@/components/ProductCard/ProductCard";
import { TextLink } from "@/components/TextLink/TextLink";
import { Lead, Title } from "@/components/Typography/Typography";
import type { Locale } from "next-intl";
import type { Banner } from "@/lib/catalog/categories";
import { photosOf, styledPhoto } from "@/lib/catalog/photos";
import type { Product } from "@/lib/catalog/types";

type CategoryFeatureProps = {
  id: string;
  title: string;
  lead: string;
  link: { href: string; label: string };
  banner: Banner;
  pieces: readonly Product[];
  locale: Locale;
  /* Odd sections swap sides and switch to the light palette */
  reversed: boolean;
};

const PHOTO_SIDE = { right: "md:right-0", left: "md:left-0" } as const;
const ARCH_CENTRE = { right: "md:left-[77.5%]", left: "md:left-[22.5%]" } as const;

/* Half photo, half copy, with three styled pieces that open the gallery */
export const CategoryFeature = ({ id, title, lead, link, banner, pieces, locale, reversed }: CategoryFeatureProps) => {
  const side = reversed ? "left" : "right";
  /* Tall photos are shown whole in an arch on desktop instead of being cropped to fill the half */
  const frame = banner.framed
    ? `md:top-1/2 md:aspect-[900/1612] md:h-[82%] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-arch ${ARCH_CENTRE[side]}`
    : `md:inset-y-0 md:h-auto md:w-1/2 ${PHOTO_SIDE[side]}`;

  return (
    <section aria-labelledby={id} className={`relative grid overflow-hidden border-t border-gold-faint md:h-[clamp(520px,70svh,700px)] md:grid-cols-2 ${reversed ? "band-light-2" : "band"}`}>
      <div className={`relative h-90 overflow-hidden md:absolute ${frame}`}>
        <Image src={banner.src} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: banner.focus }} />
      </div>
      <div
        className={`reveal self-center px-(--gutter) pb-14 pt-10 md:py-12 ${
          reversed
            ? "md:col-start-2 md:pl-[clamp(40px,6vw,96px)] md:pr-[max(var(--gutter),calc((100vw-var(--max-content))/2))]"
            : "md:pl-[max(var(--gutter),calc((100vw-var(--max-content))/2))]"
        }`}
      >
        <Title as="h2" size="xl" id={id}>
          {title}
        </Title>
        <Lead>{lead}</Lead>
        <div className="mb-7 mt-9 grid grid-cols-[repeat(3,minmax(0,150px))] gap-3">
          {pieces.map((product) => (
            <ProductCard key={product.id} name={product.name[locale]} photos={photosOf(product)} cover={styledPhoto(product)} sizes="150px" />
          ))}
        </div>
        <TextLink href={link.href}>{link.label}</TextLink>
      </div>
    </section>
  );
};
