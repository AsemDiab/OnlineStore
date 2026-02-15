import { NumericalValidator } from "./NumericalValidator";

export class QuantityValidator implements NumericalValidator {
  validate(value: number): boolean {
    return value > 0;
  }
}
