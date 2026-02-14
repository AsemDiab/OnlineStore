export class Inventory {
    constructor(quantityValidator) {
        this.inventory = new Map();
        this.quantityValidator = quantityValidator;
    }
    setQuantity(product, qty) {
        if (qty === 0) {
            this.inventory.delete(product.id);
        }
        else {
            this.inventory.set(product.id, { product, qty });
        }
    }
    addToInventory(product, qty) {
        if (!this.quantityValidator.validate(qty))
            throw new Error("the quantity should be positive");
        this.setQuantity(product, this.getCount(product) + qty);
        return true;
    }
    removeFromInventory(product, qty) {
        if (!this.quantityValidator.validate(qty))
            throw new Error("the quantity should be positive");
        if (!this.checkAvailability(product, qty)) {
            throw new Error("The needed quantity is larger than the quantity in inventory");
        }
        this.setQuantity(product, this.getCount(product) - qty);
        return true;
    }
    getCount(product) {
        return this.inventory.get(product.id)?.qty ?? 0;
    }
    checkAvailability(product, qty) {
        if (!this.quantityValidator.validate(qty))
            throw new Error("the quantity should be positive");
        if (qty > this.getCount(product))
            return false;
        return true;
    }
    get inventoryContent() {
        return Array.from(this.inventory.entries()).map(([id, { product, qty }]) => ({
            product,
            qty,
        }));
    }
}
