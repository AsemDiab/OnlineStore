export abstract class Payment{
  abstract pay(amount:number):void 
  abstract checkBalanceAvailability (amount:number):boolean
}



