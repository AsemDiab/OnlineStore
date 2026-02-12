import { User } from "./User.js"
import { Cart } from "./Cart.js"
export class Customer extends User {
  cart:Cart;
  constructor() {
    super();
    this.cart = new Cart();
  }

  getRole() {
    return "Customer";
  }

  getCart() {
    return this.cart;
  }
}
