"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("./Store");
const Product_1 = require("./Product");
const Cart_1 = require("./Cart");
const CreditCard_1 = require("./CreditCard");
try {
    const store = new Store_1.Store();
    const Iphone15 = new Product_1.Product("Iphone15", 500);
    const ds554HV = new Product_1.Product("ds554HV", 15);
    const Mouse = new Product_1.Product("MArvo Mouse", 5);
    store.addToInventory(Iphone15, 3);
    store.addToInventory(ds554HV, 5);
    store.addToInventory(Mouse, 2);
    const cart = new Cart_1.Cart();
    cart.addToCart(Iphone15, 20);
    const cardInfo = new CreditCard_1.CardInfo("4242 4242 4242 4242", "Asem Diab", new Date(2026, 11, 5), "123");
    const card = new CreditCard_1.CreditCard(cardInfo, 1000);
    (0, Cart_1.displayCart)(cart.cartContent);
    store.checkout(cart, card);
    (0, Cart_1.displayCart)(cart.cartContent);
}
catch (_a) {
    console.error("an Error caught");
}
