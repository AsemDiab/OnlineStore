import { Product } from "./Product.js"

export class Cart{
  private cart:Record<number, { product: Product, qty: number }>={}
  constructor(){

  }

  addToCart(product:Product,qty:number):boolean{
    if (qty <= 0) {
      throw new Error("Quantity must be greater than 0")
    }
this.cart[product.id] = { 
    product, 
    qty: (this.cart[product.id]?.qty || 0) + qty 
}
    return true
  }
  removeFromCart(product:Product,qty:number):boolean{
    const productRecord:{ product: Product, qty: number }=this.cart[product.id]
    if(!productRecord)
        throw new Error("The product not in cart")
    if(productRecord.qty<qty)
        throw new Error("The quantity of product in cart is less than the quantity needed for remove")
    if(productRecord.qty==qty)
        delete this.cart[product.id]
    else
        this.cart[product.id].qty-=qty
    return true
  }
  get cartContent():Record<number, { product: Product, qty: number }>{
    return this.cart
  }

  clearCart():boolean{
    this.cart={}
    return true
  }

}

  export function displayCart(cart:Record<number, { product: Product, qty: number }>):void{
    console.log("++++++++Cart+++++++++")
    Object.values(cart).forEach(record=>{
        console.log(`${record.product.name}:${record.qty} \n`)
    })
  }


