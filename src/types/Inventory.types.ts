import { Product } from "../Product.js";

export type StorageItem = { product: Product; qty: number };
export type StorageMap = Map<number, StorageItem>;
