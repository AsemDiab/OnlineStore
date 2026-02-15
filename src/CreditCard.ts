import { Payment } from "./Payment";

export class CreditCardInfo {
  private cardNumber: string = "";
  private holderName: string = "";
  private expirationDate: Date = new Date();
  private CVC: string = "";
  constructor(
    cardNumber: string = "",
    holderName: string = "",
    expirationDate: Date = new Date(),
    CVC: string = "",
  ) {
    this.cardNumber = cardNumber;
    this.holderName = holderName;
    this.expirationDate = expirationDate;
    this.CVC = CVC;
  }

  public getHolderName(): string {
    return this.holderName;
  }
  public getCardNumber(): string {
    return this.cardNumber;
  }
  public getExpirationDate(): Date {
    return this.expirationDate;
  }
  public getCVC(): string {
    return this.CVC;
  }
}

export class CreditCard implements Payment {
  private cardInfo: CreditCardInfo;
  private balance: number = 0;
  constructor(cardInfo: CreditCardInfo, balance: number) {
    this.validateBalance(balance);
    this.cardInfo = cardInfo;
    this.balance = balance;
  }
  validateBalance(balance: number) {
    if (balance <= 0) throw new Error("the balance should be positive");
  }
  checkBalanceAvailability(amount: number): boolean {
    return amount <= this.balance;
  }
  pay(amount: number): void {
    console.log(
      "paying via card with holder name " + this.cardInfo.getHolderName(),
    );
    this.balance -= amount;
  }
  getBalance(): number {
    return this.balance;
  }
  setBalance(balance: number) {
    this.validateBalance(balance);
    this.balance = balance;
  }
  get creditCardInfo(): CreditCardInfo {
    return this.cardInfo;
  }
}
