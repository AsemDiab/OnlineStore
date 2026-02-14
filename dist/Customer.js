import { User } from "./User.js";
export class Customer extends User {
    constructor() {
        super();
    }
    getRole() {
        return "Customer";
    }
}
