import { CATEGORIES, type Category } from "./types";

export const categoryHref = (category: Category) => `/jewelry/${category}`;

export const isCategory = (value: string): value is Category => CATEGORIES.some((category) => category === value);

/* Home "shop by type" tiles — one strong styled photo each */
export const CATEGORY_TILES: Record<Category, string> = {
  rings: "/images/rings/crossover-ring-4.jpg",
  earrings: "/images/earrings/teardrop-earrings-2.jpg",
  bangles: "/images/bangles/twist-bangle-3.jpg",
  pendants: "/images/pendants/teardrop-necklace-3.jpg",
  sets: "/images/bangles/link-bangle-3.jpg",
};

/*
 * Wide banners crop portrait photos, so each one is aimed at where its piece sits in the frame.
 * A framed banner shows a tall photo whole inside an arch instead of cropping it.
 */
export type Banner = { src: string; focus: string; framed: boolean };

export const CATEGORY_BANNERS: Record<Category, Banner> = {
  rings: { src: "/images/rings/crossover-ring-4.jpg", focus: "50% 80%", framed: false },
  earrings: { src: "/images/earrings/topaz-earrings-2.jpg", focus: "50% 58%", framed: false },
  bangles: { src: "/images/bangles/twist-bangle-3.jpg", focus: "50% 46%", framed: false },
  pendants: { src: "/images/pendants/teardrop-necklace-3.jpg", focus: "50% 84%", framed: false },
  sets: { src: "/images/sets/link-boxes.jpg", focus: "50% 45%", framed: true },
};

export const ALL_JEWELRY_BANNER: Banner = { src: "/images/earrings/smoky-drop-earrings-3.jpg", focus: "50% 40%", framed: false };
