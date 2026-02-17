import { Product } from "../Product.js";

export function deleteFromArray(key: Product, array: Product[]): void {
  var index = array.indexOf(key, 0);

  if (index > -1) {
    array.splice(index, 1);
  }
}
