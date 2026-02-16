import { getQuantity, setQuantity, storageContent } from "./common/MapUtils";
import { IProductCollection } from "./IProductCollection";
import { NumericalValidator } from "./NumericalValidator";
import { Product } from "./Product";
import { StorageMap } from "./types/Inventory.types";
import { StorageItem } from "./types/Inventory.types.js";
export class Inventory {
  private quantityValidator: NumericalValidator;
  private storageManager: StorageMap;

  constructor(quantityValidator: NumericalValidator) {
    this.quantityValidator = quantityValidator;
    this.storageManager = new Map<number, StorageItem>();
  }

  addToInventory(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
      throw new Error("the quantity should be positive");

    setQuantity(
      this.storageManager,
      product,
      getQuantity(this.storageManager, product) + qty,
    );
    return true;
  }
  removeFromInventory(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
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
    if (!this.quantityValidator.validate(qty))
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
