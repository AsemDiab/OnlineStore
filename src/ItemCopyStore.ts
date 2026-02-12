export class  ItemCopyStore {
    productId:number
  constructor(id:number = 0) {
    this.productId = id;
  }
  isAvalible():boolean {
    return true;
  }
}