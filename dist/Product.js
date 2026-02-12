"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(_name = "", _price = 0) {
        this.validatePrice(this.price);
        this._name = _name;
        this._price = _price;
        this._id = Product.productCreated++;
    }
    validatePrice(price) {
        if (price < 0)
            throw new Error("the price should be positive");
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get id() {
        return this._id;
    }
    getInfo() {
        return {
            name: this.name,
            price: this.price,
        };
    }
}
exports.Product = Product;
Product.productCreated = 0;
