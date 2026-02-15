import { IProductCollection } from "./IProductCollection";
import { NumericalValidator } from "./NumericalValidator";
import { Product } from "./Product";
export class Inventory {
  private quantityValidator: NumericalValidator;
  private storageManager: IProductCollection;

  constructor(
    storageManager: IProductCollection,
    quantityValidator: NumericalValidator,
  ) {
    this.quantityValidator = quantityValidator;
    this.storageManager = storageManager;
  }

  addToInventory(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
      throw new Error("the quantity should be positive");

    this.storageManager.setQuantity(
      product,
      this.storageManager.getQuantity(product) + qty,
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

    this.storageManager.setQuantity(
      product,
      this.storageManager.getQuantity(product) - qty,
    );
    return true;
  }

  checkAvailability(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
      throw new Error("the quantity should be positive");

    if (qty > this.storageManager.getQuantity(product)) return false;
    return true;
  }

  get inventoryContent(): { product: Product; qty: number }[] {
    return this.storageManager.storageContent;
  }

  getCount(product: Product): number {
    return this.storageManager.getQuantity(product);
  }
}
