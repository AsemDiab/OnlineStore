
import { Store } from "./Store.js";
import { Product } from "./Product.js";
import { Cart, displayCart } from "./Cart.js";
import { CardInfo, CreditCard } from "./CreditCard.js";

try{
  
const cart=new Cart()
const user1=new Store(cart)

const Iphone15=new Product("Iphone15",500)
const ds554HV=new Product("ds554HV",15)
const Mouse=new Product("MArvo Mouse",5)

user1.addToInventory(Iphone15,3)
user1.addToInventory(ds554HV,5)
user1.addToInventory(Mouse,2)


cart.addToCart(Iphone15,20)

const cardInfo=new CardInfo(
  "4242 4242 4242 4242",
  "Asem Diab",
  new Date(2026,11,5),
  "123"
)

const card=new CreditCard(cardInfo,1000)

displayCart(cart.cartContent)
user1.checkout(cart,card)
displayCart(cart.cartContent)

}catch{
  console.error("an Error caught");
}
