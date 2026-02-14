import { NumericalValidator } from "./NumericalValidator.js";
import { Product } from "./Product.js";

export class Cart {
  private cart: Map<number, { product: Product; qty: number }>;
  private quantityValidator: NumericalValidator;
  constructor(quantityValidator: NumericalValidator) {
    if (!quantityValidator)
      throw new Error("the quantityValidator should be provided");
    this.quantityValidator = quantityValidator;
    this.cart = new Map();
  }

  containsProduct(product: Product): boolean {
    return this.cart.has(product.id);
  }

  addToCart(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    this.setQuantity(product, this.getQuantity(product.id) + qty);
    return true;
  }
  removeFromCart(product: Product, qty: number): boolean {
    if (!this.quantityValidator.validate(qty)) {
      throw new Error("Quantity must be greater than 0 (positive)");
    }
    if (!this.containsProduct(product)) {
      throw new Error("The product not in cart");
    }
    if (this.getQuantity(product.id) < qty)
      throw new Error(
        "The quantity of product in cart is less than the quantity needed for remove",
      );
    if (this.getQuantity(product.id) == qty) this.setQuantity(product, 0);
    else this.setQuantity(product, this.getQuantity(product.id) - qty);
    return true;
  }
  get cartContent(): Record<number, { product: Product; qty: number }> {
    return Object.fromEntries(this.cart.entries());
  }

  clearCart(): boolean {
    this.cart.clear();
    return true;
  }

  private setQuantity(product: Product, qty: number): void {
    if (qty === 0) {
      this.cart.delete(product.id);
    } else {
      this.cart.set(product.id, { product, qty });
    }
  }

  private getQuantity(productId: number): number {
    return this.cart.get(productId)?.qty || 0;
  }
}

export function displayCart(
  cart: Record<number, { product: Product; qty: number }>,
): void {
  console.log("++++++++Cart+++++++++");
  Object.values(cart).forEach((record) => {
    console.log(`${record.product.name}:${record.qty} \n`);
  });
}
