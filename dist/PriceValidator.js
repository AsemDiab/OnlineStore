export class PriceValidator {
    constructor(minPrice = 0) {
        this.minPrice = minPrice;
    }
    validate(price) {
        return this.minPrice < price;
    }
}
