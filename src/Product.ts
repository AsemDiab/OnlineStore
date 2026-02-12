export class Product {
  private static productCreated: number = 0;
  private _name: string;
  private _price: number;
  private _id: number;

  constructor(_name: string = "", _price: number = 0) {
    this.validatePrice(this.price);
    this._name = _name;
    this._price = _price;
    this._id = Product.productCreated++;
  }

  validatePrice(price: number): void {
    if (price < 0) throw new Error("the price should be positive");
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

  getInfo() {
    return {
      name: this.name,
      price: this.price,
    };
  }
}
