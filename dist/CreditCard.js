export class CreditCardInfo {
    constructor(cardNumber = "", holderName = "", expirationDate = new Date(), CVC = "") {
        this.cardNumber = "";
        this.holderName = "";
        this.expirationDate = new Date();
        this.CVC = "";
        this.cardNumber = cardNumber;
        this.holderName = holderName;
        this.expirationDate = expirationDate;
        this.CVC = CVC;
    }
    getHolderName() { return this.holderName; }
    getCardNumber() { return this.cardNumber; }
    getExpirationDate() { return this.expirationDate; }
    getCVC() { return this.CVC; }
}
export class CreditCard {
    constructor(cardInfo, balance) {
        this.balance = 0;
        this.validateBalance(balance);
        this.cardInfo = cardInfo;
        this.balance = balance;
    }
    validateBalance(balance) {
        if (balance <= 0)
            throw new Error("the balance should be positive");
    }
    checkBalanceAvailability(amount) {
        return (amount <= this.balance);
    }
    pay(amount) {
        console.log("paying via card with holder name " + this.cardInfo.getHolderName());
        this.balance -= amount;
    }
    getBalance() { return this.balance; }
    setBalance(balance) { this.validateBalance(balance); }
}
