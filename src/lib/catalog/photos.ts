import type { Product } from "./types";

export const photosOf = (product: Product): readonly string[] =>
  product.kind === "set"
    ? product.photos
    : Array.from({ length: product.photoCount }, (_, index) => `/images/${product.category}/${product.id}-${index + 1}.jpg`);

/* Listing cards lead with the first photo and reveal the second on hover */
export const cardPhotos = (product: Product) => {
  const [cover, hover] = photosOf(product);
  return { cover, hover };
};

/* Where only styled photography fits, a piece shows its first styled shot instead of the studio one */
export const styledPhoto = (product: Product) => {
  const photos = photosOf(product);
  return product.kind === "piece" && photos.length > 1 ? photos[1] : photos[0];
};
