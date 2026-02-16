import { getQuantity, setQuantity, storageContent } from "./common/MapUtils";
import { isValidQuantity } from "./common/valiadtor";

import { Product } from "./Product";
import { StorageMap } from "./types/Inventory.types";
import { StorageItem } from "./types/Inventory.types";
export class Inventory {
  private storageManager: StorageMap;

  constructor() {
    this.storageManager = new Map<number, StorageItem>();
  }

  addToInventory(product: Product, qty: number): boolean {
    if (!isValidQuantity(qty))
      throw new Error("the quantity should be positive");

    setQuantity(
      this.storageManager,
      product,
      getQuantity(this.storageManager, product) + qty,
    );
    return true;
  }
  removeFromInventory(product: Product, qty: number): boolean {
    if (!isValidQuantity(qty))
      throw new Error("the quantity should be positive");

    if (!this.checkAvailability(product, qty)) {
      throw new Error(
        "The needed quantity is larger than the quantity in inventory",
      );
    }

    setQuantity(
      this.storageManager,
      product,
      getQuantity(this.storageManager, product) - qty,
    );
    return true;
  }

  checkAvailability(product: Product, qty: number): boolean {
    if (!isValidQuantity(qty))
      throw new Error("the quantity should be positive");

    if (qty > getQuantity(this.storageManager, product)) return false;
    return true;
  }

  get inventoryContent(): { product: Product; qty: number }[] {
    return storageContent(this.storageManager);
  }

  getCount(product: Product): number {
    return getQuantity(this.storageManager, product);
  }
}
