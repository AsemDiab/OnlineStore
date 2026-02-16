import { isValidPrice } from "./common/valiadtor";

export class Product {
  private static productsCreated: number = 0;
  private _name: string;
  private _price: number;
  private _id: number;

  constructor(_name: string, _price: number) {
    if (!isValidPrice(_price)) throw new Error("the price should be positive");
    this._name = _name;
    this._price = _price;
    this._id = Product.productsCreated++;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
  get id(): number {
    return this._id;
  }

  getInfo(): { id: number; name: string; price: number } {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
    };
  }
}
