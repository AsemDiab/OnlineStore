import { IProductCollection } from "./IProductCollection.js";
import { Product } from "./Product.js";


export class ProductMapStorage implements IProductCollection {
    private storage: Map<number, { product: Product; qty: number }>;
    
    constructor() {
        this.storage = new Map<number, { product: Product; qty: number }>();
    }
    setQuantity(product: Product, qty: number): boolean{
    if (qty === 0) {
      this.storage.delete(product.id);
    } else {
      this.storage.set(product.id, { product, qty });
    }
    return true;
    }
    getQuantity(product: Product): number{
        return this.storage.get(product.id)?.qty ?? 0;
        
    }

    get storageContent():{ product: Product; qty: number }[]{
        return Array.from(this.storage.entries()).map(([id,{product,qty}])=>({product,qty}))
    }
    clearInventory(): void{
        this.storage.clear();
    }
    getItem(id:number):Product|null{
        return this.storage.get(id)?.product ?? null;
    }

}