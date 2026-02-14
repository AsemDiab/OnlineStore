export class Product {
    constructor(_name = "", _price = 0) {
        this.validatePrice(_price);
        this._name = _name;
        this._price = _price;
        this._id = Product.productsCreated++;
    }
    validatePrice(price) {
        if (price <= 0)
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
            id: this.id,
            name: this.name,
            price: this.price,
        };
    }
}
Product.productsCreated = 0;
