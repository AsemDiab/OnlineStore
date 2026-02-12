"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const utils_1 = require("./utils");
class Inventory {
    validateQuantity(quantity) {
        if (quantity < 0)
            throw new Error("the quantity should be positive");
        return true;
    }
    constructor() {
        this.inventory = [];
    }
    addToInventory(product, qty) {
        this.validateQuantity(qty);
        for (let i = 0; i < qty; i++)
            this.inventory.push(product);
        return true;
    }
    removeFromInventory(product, qty) {
        this.validateQuantity(qty);
        const isAvalible = this.checkAvailability(product, qty);
        if (!isAvalible) {
            console.log("The needed quantity is larger than the quantity in inventory");
            return false;
        }
        for (let i = 0; i < qty; i++)
            (0, utils_1.deleteFromArray)(product, this.inventory);
        return true;
    }
    checkAvailability(product, qty) {
        this.validateQuantity(qty);
        const qtyInInventory = this.inventory.filter((item) => product.id == item.id).length;
        if (qty > qtyInInventory)
            return false;
        return true;
    }
    get inventoryContent() {
        return this.inventory;
    }
}
exports.Inventory = Inventory;
