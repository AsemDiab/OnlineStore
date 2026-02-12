"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const User_1 = require("./User");
const Cart_1 = require("./Cart");
class Customer extends User_1.User {
    constructor() {
        super();
        this.cart = new Cart_1.Cart();
    }
    getRole() {
        return "Customer";
    }
    getCart() {
        return this.cart;
    }
}
exports.Customer = Customer;
