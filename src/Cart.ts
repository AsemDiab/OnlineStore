import { getQuantity, setQuantity, storageContent } from "./common/MapUtils";
import { isValidQuantity } from "./common/valiadtor";

import { Product } from "./Product";
import { StorageItem, StorageMap } from "./types/Inventory.types";

export class Cart {
  private storageManager: StorageMap;
  constructor() {
    this.storageManager = new Map<number, StorageItem>();
  }

  containsProduct(product: Product): boolean {
    return getQuantity(this.storageManager, product) !== 0;
  }

  addToCart(product: Product, qty: number): boolean {
    if (!isValidQuantity(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    setQuantity(
      this.storageManager,
      product,
      getQuantity(this.storageManager, product) + qty,
    );
    return true;
  }
  removeFromCart(product: Product, qty: number): boolean {
    if (!isValidQuantity(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    if (!this.containsProduct(product)) {
      throw new Error("The product not in cart");
    }
    if (getQuantity(this.storageManager, product) < qty)
      throw new Error(
        "The quantity of product in cart is less than the quantity needed for remove",
      );
    if (getQuantity(this.storageManager, product) == qty)
      setQuantity(this.storageManager, product, 0);
    else
      setQuantity(
        this.storageManager,
        product,
        getQuantity(this.storageManager, product) - qty,
      );
    return true;
  }
  get cartContent(): { product: Product; qty: number }[] {
    return storageContent(this.storageManager);
  }

  clearCart(): boolean {
    this.storageManager.clear();
    return true;
  }
  getProduct(product: Product): { product: Product; qty: number } {
    return {
      product: product,
      qty: getQuantity(this.storageManager, product),
    };
  }
}
