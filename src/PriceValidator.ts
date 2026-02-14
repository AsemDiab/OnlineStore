import { NumericalValidator } from "./NumericalValidator.js";

export class PriceValidator implements NumericalValidator {
  private minPrice;
  constructor(minPrice: number = 0) {
    this.minPrice = minPrice;
  }
  validate(price: number): boolean {
    return this.minPrice < price;
  }
}
