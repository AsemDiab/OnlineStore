import { Product } from "./Product";
import { Cart } from "./Cart";
import { Inventory } from "./Inventory";
import { User } from "./User";
import { Payment } from "./Payment";
import { StorageItem } from "./types/Inventory.types.js";

export class Store {
  private inventory: Inventory;
  private users: User[];
  private cart: Cart;
  constructor(cart: Cart, inventory: Inventory) {
    this.inventory = inventory;
    this.users = [];
    this.cart = cart;
  }

  addToInventory(product: Product, qty: number): boolean {
    this.inventory.addToInventory(product, qty);
    return true;
  }

  removeFromInventory(product: Product, qty: number): boolean {
    try {
      this.inventory.removeFromInventory(product, qty);
      console.log("removing proccess succeeded");
      return true;
    } catch {
      console.log("removing proccess failed");
      return false;
    }
  }

  addUser(user: User): boolean {
    this.users.push(user);
    return true;
  }

  private validateInventoryAvailabilityWithReduce(cart: Cart): boolean {
    const values = Object.values(cart.cartContent) as StorageItem[];
    return values.reduce(
      (isValid, record: StorageItem) =>
        isValid && this.inventory.checkAvailability(record.product, record.qty),

      true,
    ) as boolean;
  }
  private validateInventoryAvailability(cart: Cart): boolean {
    const issues: string[] = [];

    let isValid = true;
    Object.values(cart.cartContent).forEach((record) => {
      isValid =
        isValid && this.inventory.checkAvailability(record.product, record.qty);
    });

    return isValid;
  }

  checkout(payment: Payment): void {
    const cartContent = this.cart.cartContent;
    const isValid = this.validateInventoryAvailability(this.cart);
    if (!isValid) {
      throw new Error("One or more products are not available in inventory");
    }

    const total: number = this.calculateTotal(this.cart);

    if (!payment.checkBalanceAvailability(total)) {
      throw new Error("The total is larger than money that you have");
    } else console.log("Checkout succeeded");

    cartContent.forEach((record) => {
      this.removeFromInventory(record.product, record.qty);
    });

    this.cart.clearCart();
    payment.pay(total);
  }

  private calculateTotal(cart: Cart): number {
    return Object.values(cart.cartContent).reduce(
      (total: number, record: StorageItem) =>
        total + record.product.price * record.qty,
      0,
    ) as number;
  }

  addToCart(product: Product, qty: number): boolean {
    if (!product)
      throw new Error("product and quantity shouldn't be null or undefined");
    if (!this.inventory.checkAvailability(product, qty)) {
      throw new Error(`should not add to cart when inventory unavailable`);
    }
    return this.cart.addToCart(product, qty);
  }

  removeFromCart(product: Product, qty: number): boolean {
    if (!this.cart.containsProduct(product)) {
      console.log(`**the product ${product.name} is not in cart`);
      return false;
    }
    if (this.cart.getProduct(product).qty < qty) {
      console.log(
        `**the quantity of ${product.name} in cart is less than ${qty}`,
      );
      return false;
    }
    return this.cart.removeFromCart(product, qty);
  }

  clearCart(): boolean {
    return this.cart.clearCart();
  }
}
