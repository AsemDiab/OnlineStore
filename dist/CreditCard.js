"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCard = exports.CardInfo = void 0;
const Payment_1 = require("./Payment");
class CardInfo {
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
}
exports.CardInfo = CardInfo;
class CreditCard extends Payment_1.Payment {
    constructor(cardInfo, balance) {
        super();
        this.balance = 0;
        this.cardInfo = cardInfo;
        this.balance = balance;
    }
    validateBalance(balance) {
        if (balance < 0)
            throw new Error("the balance should be positive");
    }
    checkBalanceAvailability(amount) {
        return (amount <= this.balance);
    }
    pay(amount) {
        console.log("paying via card with holder name " + this.cardInfo.getHolderName());
        this.balance -= amount;
    }
}
exports.CreditCard = CreditCard;
