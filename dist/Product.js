export class Product {
    constructor(_name = "", _price = 0, priceValidator) {
        if (!priceValidator)
            throw new Error("the priceValidator shouldn't be null or undefiend");
        if (!priceValidator.validate(_price))
            throw new Error("the price should be positive");
        this._name = _name;
        this._price = _price;
        this._id = Product.productsCreated++;
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
