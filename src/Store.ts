import { Product } from "./Product.js"
import { Cart, displayCart } from "./Cart.js"
import { Inventory } from "./Inventory.js";
import { User } from "./User.js";
import { Payment } from "./Payment.js";
import { Customer } from "./Customer.js";
import { CardInfo, CreditCard } from "./CreditCard.js";











export class Store{
  private inventory:Inventory;
  private users:User[];
  private cart:Cart;
  constructor(cart:Cart){
    this.inventory=new Inventory()
    this.users=[]
    this.cart=cart
  }

  addToInventory(product:Product,qty:number):boolean{
    this.inventory.addToInventory(product,qty)
    //not Finised yet
    return true
  }

  removeFromInventory(product:Product,qty:number):void{
    const result=this.inventory.removeFromInventory(product,qty)
    console.log("removing proccess "+(result?"succeeded":"failed"))

  }

  addUser(user:User):boolean{
    this.users.push(user)
    return true
  }
  
  checkout(cart:Cart,payment:Payment):void{
    const cartContent=cart.cartContent
    let total=0
      let isAvalible:boolean=true
    Object.values(cartContent).forEach(record=>{
      isAvalible&&=this.inventory.checkAvailability(record.product,record.qty)
      total+=record.product.price*record.qty
      if(!this.inventory.checkAvailability(record.product,record.qty))console.log(`**the count of ${record.product.name} in inventory is less than ${record.qty} `)
    })

    
    if(!isAvalible){ 
      console.log("One or more products are not available in inventory")
       return
       }
    if(!payment.checkBalanceAvailability (total)){ 
      console.log("The total is larger than money that you have")
       return
       }
    else console.log("Checkout succeeded");

     Object.values(cartContent).forEach(record=>{
      this.removeFromInventory(record.product,record.qty)
    })

    cart.clearCart()
    payment.pay(total)


    
  } 

  addToCart(product:Product,qty:number):boolean{
    if (!this.inventory.checkAvailability(product, qty)) {
      console.log(`**the count of ${product.name} in inventory is less than ${qty} `)
      return false
    }
    return this.cart.addToCart(product,qty)
  }

  removeFromCart(product:Product,qty:number):boolean{
    if (!this.cart.cartContent[product.id]) {
      console.log(`**the product ${product.name} is not in cart`)
      return false
    }
    if (this.cart.cartContent[product.id].qty < qty) {
      console.log(`**the quantity of ${product.name} in cart is less than ${qty}`)
      return false
    }
    return this.cart.removeFromCart(product,qty)
  }

  clearCart():boolean{
    return this.cart.clearCart()
  }
}

