import { IProductCollection } from "./IProductCollection";
import { NumericalValidator } from "./NumericalValidator";
import { Product } from "./Product";

export class Cart {
  private quantityValidator: NumericalValidator;
  private storageManager: IProductCollection;
  constructor(
    storageManager: IProductCollection,
    quantityValidator: NumericalValidator,
  ) {
    this.quantityValidator = quantityValidator;
    this.storageManager = storageManager;
  }

  containsProduct(product: Product): boolean {
    return this.storageManager.getQuantity(product) !== 0;
  }

  addToCart(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    this.storageManager.setQuantity(
      product,
      this.storageManager.getQuantity(product) + qty,
    );
    return true;
  }
  removeFromCart(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    if (!this.containsProduct(product)) {
      throw new Error("The product not in cart");
    }
    if (this.storageManager.getQuantity(product) < qty)
      throw new Error(
        "The quantity of product in cart is less than the quantity needed for remove",
      );
    if (this.storageManager.getQuantity(product) == qty)
      this.storageManager.setQuantity(product, 0);
    else
      this.storageManager.setQuantity(
        product,
        this.storageManager.getQuantity(product) - qty,
      );
    return true;
  }
  get cartContent(): { product: Product; qty: number }[] {
    return this.storageManager.storageContent;
  }

  clearCart(): boolean {
    this.storageManager.clear();
    return true;
  }
  getProduct(product: Product): { product: Product; qty: number } {
    if (!this.storageManager.getItem(product.id)) throw new Error("x");
    return {
      product: product,
      qty: this.storageManager.getQuantity(product),
    };
  }
}
