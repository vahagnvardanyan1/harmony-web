import { NEW_IN_IDS, PRODUCTS } from "./products";
import type { Category } from "./types";

export const productsIn = (category: Category) => PRODUCTS.filter((product) => product.category === category);

export const newInProducts = () =>
  NEW_IN_IDS.map((id) => {
    const product = PRODUCTS.find((candidate) => candidate.id === id);
    if (!product) throw new Error(`New-in rail lists "${id}", which is not in the catalog`);
    return product;
  });
