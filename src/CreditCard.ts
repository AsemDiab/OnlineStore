import { Payment } from "./Payment.js"

export class CardInfo{
  private cardNumber:string=""
  private holderName:string=""
  private expirationDate:Date=new Date()
  private CVC:string=""
  constructor(cardNumber:string="",holderName:string="",expirationDate:Date=new Date(),CVC:string=""){
    this.cardNumber=cardNumber
    this.holderName=holderName
    this.expirationDate=expirationDate
    this.CVC=CVC
  }



  public getHolderName():string{return this.holderName}
}


export class CreditCard extends Payment{
  private cardInfo:CardInfo;
  private balance:number=0
  constructor(cardInfo:CardInfo,balance:number){
    super()
    this.cardInfo=cardInfo
    this.balance=balance
  }
  validateBalance(balance:number){
    if(balance<0) throw new Error("the balance should be positive");
  }
  checkBalanceAvailability (amount:number):boolean{
     return(amount<=this.balance)
  }
  pay(amount:number):void {
    console.log("paying via card with holder name "+this.cardInfo.getHolderName())
    this.balance-=amount
   
  }
}
