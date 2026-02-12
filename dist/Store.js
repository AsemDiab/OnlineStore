"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const Inventory_1 = require("./Inventory");
class Store {
    constructor() {
        this.inventory = new Inventory_1.Inventory();
        this.users = [];
    }
    addToInventory(product, qty) {
        this.inventory.addToInventory(product, qty);
        //not Finised yet
        return true;
    }
    removeFromInventory(product, qty) {
        const result = this.inventory.removeFromInventory(product, qty);
        console.log("removing proccess " + (result ? "succeeded" : "failed"));
    }
    addUser(user) {
        this.users.push(user);
        return true;
    }
    checkout(cart, payment) {
        const cartContent = cart.cartContent;
        let total = 0;
        let isAvalible = true;
        Object.values(cartContent).forEach(record => {
            isAvalible && (isAvalible = this.inventory.checkAvailability(record.product, record.qty));
            total += record.product.price * record.qty;
            if (!this.inventory.checkAvailability(record.product, record.qty))
                console.log(`**the count of ${record.product.name} in inventory is less than ${record.qty} `);
        });
        if (!isAvalible) {
            console.log("One or more products are not available in inventory");
            return;
        }
        if (!payment.checkBalanceAvailability(total)) {
            console.log("The total is larger than money that you have");
            return;
        }
        else
            console.log("Checkout succeeded");
        Object.values(cartContent).forEach(record => {
            this.removeFromInventory(record.product, record.qty);
        });
        cart.clearCart();
        payment.pay(total);
    }
}
exports.Store = Store;
