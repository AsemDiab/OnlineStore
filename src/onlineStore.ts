import { Store } from "./Store.js";
import { Product } from "./Product.js";
import { Cart, displayCart } from "./Cart.js";
import { CreditCardInfo, CreditCard } from "./CreditCard.js";
import { QuantityValidator } from "./QuantityValidator.js";
import { Inventory } from "./Inventory.js";

try {
  const cart = new Cart(new QuantityValidator());
  const user1 = new Store(cart, new Inventory(new QuantityValidator()));

  const Iphone15 = new Product("Iphone15", 500);
  const ds554HV = new Product("ds554HV", 15);
  const Mouse = new Product("MArvo Mouse", 5);

  user1.addToInventory(Iphone15, 3);
  user1.addToInventory(ds554HV, 5);
  user1.addToInventory(Mouse, 2);

  cart.addToCart(Iphone15, 20);

  const cardInfo = new CreditCardInfo(
    "4242 4242 4242 4242",
    "Asem Diab",
    new Date(2026, 11, 5),
    "123",
  );

  const card = new CreditCard(cardInfo, 1000);

  displayCart(cart.cartContent);
  user1.checkout(card);
  displayCart(cart.cartContent);
} catch {
  console.error("an Error caught");
}
