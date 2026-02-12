"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
exports.displayCart = displayCart;
class Cart {
    constructor() {
        this.cart = {};
    }
    addToCart(product, qty) {
        var _a;
        if (qty <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
        this.cart[product.id] = {
            product,
            qty: (((_a = this.cart[product.id]) === null || _a === void 0 ? void 0 : _a.qty) || 0) + qty
        };
    }
    removeFromCart(product, qty) {
        const productRecord = this.cart[product.id];
        if (!productRecord)
            throw new Error("The product not in cart");
        if (productRecord.qty < qty)
            throw new Error("The quantity of product in cart is less than the quantity needed for remove");
        if (productRecord.qty == qty)
            delete this.cart[product.id];
        else
            this.cart[product.id].qty -= qty;
    }
    get cartContent() {
        return this.cart;
    }
    clearCart() {
        this.cart = {};
    }
}
exports.Cart = Cart;
function displayCart(cart) {
    console.log("++++++++Cart+++++++++");
    Object.values(cart).forEach(record => {
        console.log(`${record.product.name}:${record.qty} \n`);
    });
}
