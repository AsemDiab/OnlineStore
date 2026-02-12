import { ItemCopyStore } from "./ItemCopyStore.js";
import { Product } from "./Product.js";
import { deleteFromArray } from "./utils.js";

export class Inventory {
  private inventory: Product[];

  validateQuantity(quantity:number):boolean{
    if(quantity<0)throw new Error("the quantity should be positive");

    return true
  }
  constructor() {
    this.inventory = [];
  }
  addToInventory(product: Product, qty: number): boolean {
        this.validateQuantity(qty)

    for (let i = 0; i < qty; i++) this.inventory.push(product);
    return true;
  }
  removeFromInventory(product: Product, qty: number): boolean {
        this.validateQuantity(qty)

    const isAvalible = this.checkAvailability(product, qty);
    if (!isAvalible){ 
      
      console.log(
        "The needed quantity is larger than the quantity in inventory",
      );
      return false;
    }
    for (let i = 0; i < qty; i++) deleteFromArray(product, this.inventory);

    return true;
  }
  checkAvailability(product: Product, qty: number): boolean {
    this.validateQuantity(qty)
    const qtyInInventory = this.inventory.filter(
      (item) => product.id == item.id,
    ).length;
    if (qty > qtyInInventory) return false;
    return true;
  }
  get inventoryContent():Product[]{
    return this.inventory
  }
}
