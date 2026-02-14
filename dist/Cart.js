export class Cart {
    constructor(quantityValidator) {
        if (!quantityValidator)
            throw new Error("the quantityValidator should be provided");
        this.quantityValidator = quantityValidator;
        this.cart = new Map();
    }
    containsProduct(product) {
        return this.cart.has(product.id);
    }
    addToCart(product, qty) {
        if (!this.quantityValidator.validate(qty)) {
            throw new Error("Quantity must be greater than 0 (positive)");
        }
        this.setQuantity(product, this.getQuantity(product.id) + qty);
        return true;
    }
    removeFromCart(product, qty) {
        if (!this.quantityValidator.validate(qty)) {
            throw new Error("Quantity must be greater than 0 (positive)");
        }
        if (!this.containsProduct(product)) {
            throw new Error("The product not in cart");
        }
        if (this.getQuantity(product.id) < qty)
            throw new Error("The quantity of product in cart is less than the quantity needed for remove");
        if (this.getQuantity(product.id) == qty)
            this.setQuantity(product, 0);
        else
            this.setQuantity(product, this.getQuantity(product.id) - qty);
        return true;
    }
    get cartContent() {
        return Object.fromEntries(this.cart.entries());
    }
    clearCart() {
        this.cart.clear();
        return true;
    }
    setQuantity(product, qty) {
        if (qty === 0) {
            this.cart.delete(product.id);
        }
        else {
            this.cart.set(product.id, { product, qty });
        }
    }
    getQuantity(productId) {
        return this.cart.get(productId)?.qty || 0;
    }
}
export function displayCart(cart) {
    console.log("++++++++Cart+++++++++");
    Object.values(cart).forEach((record) => {
        console.log(`${record.product.name}:${record.qty} \n`);
    });
}
