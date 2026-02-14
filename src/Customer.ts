import { User } from "./User.js"
import { Cart } from "./Cart.js"
export class Customer extends User {
  constructor() {
    super();
  }

  getRole() {
    return "Customer";
  }

 
}
