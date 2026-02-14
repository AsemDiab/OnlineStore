import { NumericalValidator } from "./NumericalValidator.js";

export class QuantityValidator implements NumericalValidator{
    validate(value:number):boolean{
        return value>0
    }
}