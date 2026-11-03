import type { Locale } from "next-intl";

export const CATEGORIES = ["rings", "earrings", "bangles", "pendants", "sets"] as const;
export type Category = (typeof CATEGORIES)[number];

type Named = { id: string; name: Record<Locale, string>; isNew?: boolean };

/* A single piece has numbered photos: 1 is the studio shot, 2+ are styled */
export type Piece = Named & { kind: "piece"; category: Exclude<Category, "sets">; photoCount: number };

/* A set lists its photos explicitly, a photo of the whole set first */
export type JewelrySet = Named & { kind: "set"; category: "sets"; photos: readonly string[] };

export type Product = Piece | JewelrySet;
