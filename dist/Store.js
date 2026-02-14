export class Store {
    constructor(cart, inventory) {
        this.inventory = inventory;
        this.users = [];
        this.cart = cart;
    }
    addToInventory(product, qty) {
        this.inventory.addToInventory(product, qty);
        //not Finised yet
        return true;
    }
    removeFromInventory(product, qty) {
        const result = this.inventory.removeFromInventory(product, qty);
        console.log("removing proccess " + (result ? "succeeded" : "failed"));
    }
    addUser(user) {
        this.users.push(user);
        return true;
    }
    validateInventoryAvailability(cart) {
        const issues = [];
        Object.values(cart.cartContent).forEach((record) => {
            if (!this.inventory.checkAvailability(record.product, record.qty)) {
                issues.push(`**the count of ${record.product.name} in inventory is less than ${record.qty}`);
            }
        });
        return { isValid: issues.length === 0, issues };
    }
    checkout(payment) {
        const cartContent = this.cart.cartContent;
        const { isValid, issues } = this.validateInventoryAvailability(this.cart);
        if (!isValid) {
            throw new Error("One or more products are not available in inventory");
        }
        const total = this.calculateTotal(this.cart);
        if (!payment.checkBalanceAvailability(total)) {
            throw new Error("The total is larger than money that you have");
        }
        else
            console.log("Checkout succeeded");
        Object.values(cartContent).forEach((record) => {
            this.removeFromInventory(record.product, record.qty);
        });
        this.cart.clearCart();
        payment.pay(total);
    }
    calculateTotal(cart) {
        return Object.values(cart.cartContent).reduce((total, record) => total + record.product.price * record.qty, 0);
    }
    addToCart(product, qty) {
        if (!product)
            throw new Error("product and quantity shouldn't be null or undefined");
        if (!this.inventory.checkAvailability(product, qty ?? 0)) {
            throw new Error(`should not add to cart when inventory unavailable`);
        }
        return this.cart.addToCart(product, qty);
    }
    removeFromCart(product, qty) {
        if (!product || !qty)
            throw new Error("product and quntity shouldn't to be null or undefined");
        if (!this.cart.cartContent[product.id]) {
            console.log(`**the product ${product.name} is not in cart`);
            return false;
        }
        if (this.cart.cartContent[product.id].qty < qty) {
            console.log(`**the quantity of ${product.name} in cart is less than ${qty}`);
            return false;
        }
        return this.cart.removeFromCart(product, qty);
    }
    clearCart() {
        return this.cart.clearCart();
    }
}
