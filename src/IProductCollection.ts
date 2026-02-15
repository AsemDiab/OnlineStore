import { Product } from "./Product.js";

export interface IProductCollection {
  setQuantity(product: Product, qty: number): boolean;
  getQuantity(product: Product): number;
  get storageContent(): { product: Product; qty: number }[];
  clear(): void;
  getItem(id: number): Product | null;
}
