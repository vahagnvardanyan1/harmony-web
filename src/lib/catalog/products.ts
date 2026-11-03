import type { Locale } from "next-intl";

import type { JewelrySet, Piece, Product } from "./types";

const n = (en: string, hy: string, ru: string): Record<Locale, string> => ({ en, hy, ru });

const piece = (fields: Omit<Piece, "kind">): Piece => ({ kind: "piece", ...fields });

/* Photos are "<folder>/<file>" under public/images, without the extension */
const set = ({ photos, ...fields }: Omit<JewelrySet, "kind" | "category">): JewelrySet => ({
  kind: "set",
  category: "sets",
  photos: photos.map((photo) => `/images/${photo}.jpg`),
  ...fields,
});

/* Catalog order is display order */
export const PRODUCTS: readonly Product[] = [
  piece({ id: "blue-halo-ring", category: "rings", photoCount: 3,
    name: n("Blue halo ring", "«Կապույտ լուսապսակ» մատանի", "Кольцо «Синий ореол»") }),
  piece({ id: "blue-halo-earrings", category: "earrings", photoCount: 3,
    name: n("Blue halo earrings", "«Կապույտ լուսապսակ» ականջօղեր", "Серьги «Синий ореол»") }),
  piece({ id: "link-bangle", category: "bangles", photoCount: 3, isNew: true,
    name: n("Diamond link bangle", "Ադամանդե օղակներով ապարանջան", "Браслет «Звенья» с бриллиантами") }),
  piece({ id: "link-ring", category: "rings", photoCount: 3,
    name: n("Diamond link ring", "Ադամանդե օղակներով մատանի", "Кольцо «Звенья» с бриллиантами") }),
  piece({ id: "link-earrings", category: "earrings", photoCount: 3,
    name: n("Diamond link earrings", "Ադամանդե օղակներով ականջօղեր", "Серьги «Звенья» с бриллиантами") }),
  piece({ id: "teardrop-necklace", category: "pendants", photoCount: 3, isNew: true,
    name: n("Teardrop pendant", "«Կաթիլ» կախազարդ", "Подвеска «Капля»") }),
  piece({ id: "teardrop-earrings", category: "earrings", photoCount: 3,
    name: n("Teardrop earrings", "«Կաթիլ» ականջօղեր", "Серьги «Капля»") }),
  piece({ id: "smoky-bezel-ring", category: "rings", photoCount: 3,
    name: n("Smoky quartz ring", "Ծխագույն քվարցով մատանի", "Кольцо с дымчатым кварцем") }),
  piece({ id: "smoky-bezel-earrings", category: "earrings", photoCount: 3,
    name: n("Smoky quartz earrings", "Ծխագույն քվարցով ականջօղեր", "Серьги с дымчатым кварцем") }),
  piece({ id: "smoky-drop-ring", category: "rings", photoCount: 3,
    name: n("Smoky cushion ring", "Ծխագույն բարձաձև մատանի", "Кольцо «Кушон» с дымчатым кварцем") }),
  piece({ id: "smoky-drop-earrings", category: "earrings", photoCount: 3,
    name: n("Smoky drop earrings", "Ծխագույն կախովի ականջօղեր", "Серьги-подвески с дымчатым кварцем") }),
  piece({ id: "topaz-ring", category: "rings", photoCount: 3,
    name: n("London blue topaz ring", "Լոնդոնյան կապույտ տոպազով մատանի", "Кольцо с топазом лондон блю") }),
  piece({ id: "topaz-earrings", category: "earrings", photoCount: 3,
    name: n("London blue topaz earrings", "Լոնդոնյան կապույտ տոպազով ականջօղեր", "Серьги с топазом лондон блю") }),
  set({ id: "link-set", name: n("Diamond link set", "Ադամանդե օղակներով հավաքածու", "Комплект «Звенья» с бриллиантами"),
    photos: ["sets/link-boxes", "bangles/link-bangle-3", "bangles/link-bangle-1", "rings/link-ring-1", "earrings/link-earrings-1", "bangles/link-bangle-2", "rings/link-ring-2", "earrings/link-earrings-2"] }),
  set({ id: "blue-halo-set", name: n("Blue halo set", "«Կապույտ լուսապսակ» հավաքածու", "Комплект «Синий ореол»"),
    photos: ["rings/blue-halo-ring-3", "rings/blue-halo-ring-1", "earrings/blue-halo-earrings-1", "rings/blue-halo-ring-2", "earrings/blue-halo-earrings-2"] }),
  set({ id: "teardrop-set", name: n("Teardrop set", "«Կաթիլ» հավաքածու", "Комплект «Капля»"),
    photos: ["pendants/teardrop-necklace-3", "pendants/teardrop-necklace-1", "earrings/teardrop-earrings-1", "pendants/teardrop-necklace-2", "earrings/teardrop-earrings-2"] }),
  set({ id: "topaz-set", name: n("London blue topaz set", "Լոնդոնյան կապույտ տոպազով հավաքածու", "Комплект с топазом лондон блю"),
    photos: ["earrings/topaz-earrings-2", "rings/topaz-ring-1", "earrings/topaz-earrings-1", "rings/topaz-ring-2"] }),
  set({ id: "smoky-bezel-set", name: n("Smoky quartz set", "Ծխագույն քվարցով հավաքածու", "Комплект с дымчатым кварцем"),
    photos: ["rings/smoky-bezel-ring-3", "rings/smoky-bezel-ring-1", "earrings/smoky-bezel-earrings-1", "rings/smoky-bezel-ring-2", "earrings/smoky-bezel-earrings-2"] }),
  set({ id: "smoky-drop-set", name: n("Smoky cushion set", "Ծխագույն բարձաձև հավաքածու", "Комплект «Кушон» с дымчатым кварцем"),
    photos: ["rings/smoky-drop-ring-3", "rings/smoky-drop-ring-1", "earrings/smoky-drop-earrings-1", "rings/smoky-drop-ring-2", "earrings/smoky-drop-earrings-2"] }),
  set({ id: "cluster-set", name: n("Three-shape set", "«Երեք ձև» հավաքածու", "Комплект «Три формы»"),
    photos: ["earrings/cluster-earrings-3", "rings/cluster-ring-1", "earrings/cluster-earrings-1", "rings/cluster-ring-2", "earrings/cluster-earrings-2", "rings/cluster-ring-3"] }),
  set({ id: "clover-set", name: n("Clover set", "«Երեքնուկ» հավաքածու", "Комплект «Клевер»"),
    photos: ["rings/clover-band-3", "rings/clover-band-1", "earrings/clover-earrings-1", "rings/clover-band-2", "earrings/clover-earrings-2"] }),
  piece({ id: "cluster-ring", category: "rings", photoCount: 3,
    name: n("Three-shape cluster ring", "«Երեք ձև» մատանի", "Кольцо «Три формы»") }),
  piece({ id: "cluster-earrings", category: "earrings", photoCount: 3,
    name: n("Three-shape hoop earrings", "«Երեք ձև» օղ-ականջօղեր", "Серьги-кольца «Три формы»") }),
  piece({ id: "twist-bangle", category: "bangles", photoCount: 3,
    name: n("Twisted diamond bangle", "Ոլորված ադամանդե ապարանջան", "Витой браслет с бриллиантами") }),
  piece({ id: "crossover-bangle", category: "bangles", photoCount: 3,
    name: n("Crossover diamond bangle", "Խաչվող ադամանդե ապարանջան", "Браслет-перекрёст с бриллиантами") }),
  piece({ id: "flower-bangle", category: "bangles", photoCount: 1, isNew: true,
    name: n("Flower bangle", "«Ծաղիկ» ապարանջան", "Браслет «Цветы»") }),
  piece({ id: "beaded-bangle", category: "bangles", photoCount: 2,
    name: n("Beaded diamond bangle", "Ուլունքավոր ադամանդե ապարանջան", "Браслет из бусин с бриллиантами") }),
  piece({ id: "clover-band", category: "rings", photoCount: 3,
    name: n("Clover band", "«Երեքնուկ» մատանի", "Кольцо «Клевер»") }),
  piece({ id: "clover-earrings", category: "earrings", photoCount: 3,
    name: n("Clover hoop earrings", "«Երեքնուկ» օղ-ականջօղեր", "Серьги-кольца «Клевер»") }),
  piece({ id: "tricolor-ring", category: "rings", photoCount: 3, isNew: true,
    name: n("Tricolour beaded bands", "Եռագույն ուլունքավոր մատանիներ", "Трёхцветные кольца из бусин") }),
  piece({ id: "crossover-ring", category: "rings", photoCount: 4,
    name: n("Two-tone crossover ring", "Երկգույն խաչվող մատանի", "Двухцветное кольцо-перекрёст") }),
  piece({ id: "blue-stone-earrings", category: "earrings", photoCount: 2,
    name: n("Blue stone drop earrings", "Կապույտ քարով կախովի ականջօղեր", "Серьги-подвески с голубым камнем") }),
  piece({ id: "blue-stone-ring", category: "rings", photoCount: 2, isNew: true,
    name: n("Blue stone ring", "Կապույտ քարով մատանի", "Кольцо с голубым камнем") }),
  set({ id: "blue-stone-set", name: n("Blue stone set", "Կապույտ քարով հավաքածու", "Комплект с голубым камнем"),
    photos: ["sets/blue-stone", "rings/blue-stone-ring-1", "earrings/blue-stone-earrings-1", "rings/blue-stone-ring-2"] }),
];

/* Hand-picked for the home "new in" rail */
export const NEW_IN_IDS = ["link-bangle", "flower-bangle", "teardrop-necklace", "tricolor-ring", "topaz-ring", "smoky-drop-earrings", "crossover-ring"] as const;
