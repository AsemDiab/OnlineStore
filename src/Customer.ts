import { User } from "./User";
import { Cart } from "./Cart";
export class Customer extends User {
  constructor() {
    super();
  }

  getRole() {
    return "Customer";
  }
}
