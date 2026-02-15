import { NumericalValidator } from "./NumericalValidator";
import { Product } from "./Product";
export class Inventory {
  private inventory: Map<number, { product: Product; qty: number }>;
  private quantityValidator: NumericalValidator;

  constructor(quantityValidator: NumericalValidator) {
    this.inventory = new Map<number, { product: Product; qty: number }>();
    this.quantityValidator = quantityValidator;
  }

  private setQuantity(product: Product, qty: number): void {
    if (qty === 0) {
      this.inventory.delete(product.id);
    } else {
      this.inventory.set(product.id, { product, qty });
    }
  }
  addToInventory(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
      throw new Error("the quantity should be positive");

    this.setQuantity(product, this.getCount(product) + qty);
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

    this.setQuantity(product, this.getCount(product) - qty);
    return true;
  }

  getCount(product: Product): number {
    return this.inventory.get(product.id)?.qty ?? 0;
  }

  checkAvailability(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty))
      throw new Error("the quantity should be positive");

    if (qty > this.getCount(product)) return false;
    return true;
  }

  get inventoryContent(): { product: Product; qty: number }[] {
    return Array.from(this.inventory.entries()).map(
      ([id, { product, qty }]) => ({
        product,
        qty,
      }),
    );
  }
}
