import type { Locale } from "next-intl";

import { ProductCard } from "@/components/ProductCard/ProductCard";
import { cardPhotos, photosOf } from "@/lib/catalog/photos";
import type { Product } from "@/lib/catalog/types";

export const ProductGrid = ({ products, locale }: { products: readonly Product[]; locale: Locale }) => (
  <section className="band-light pb-[clamp(96px,11vw,160px)] pt-[clamp(56px,6vw,96px)]">
    <div className="wrap grid grid-cols-2 gap-x-3 gap-y-[clamp(44px,5vw,80px)] md:grid-cols-3 md:gap-x-[clamp(14px,1.6vw,28px)]">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name[locale]}
          photos={photosOf(product)}
          {...cardPhotos(product)}
          isNew={product.isNew}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ))}
    </div>
  </section>
);
