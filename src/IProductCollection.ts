import { Product } from "./Product.js";

export interface IProductCollection {
    setQuantity(product: Product, qty: number): boolean;
    getQuantity(product: Product): number;
    get storageContent(): { product: Product; qty: number }[];
    clearInventory(): void;
    getItem(id:number):Product|null;
}