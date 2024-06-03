import {Order} from "./order.entity";

export interface Payment {
    id: number;
    amount: number;
    paymentDate: Date;
    order ?: Order;
  }
  
  export class PaymentEntity implements Payment {
    id: number;
    amount: number;
    paymentDate: Date;
    order?: Order;
  
    constructor(payment: Payment) {
      this.id = payment.id;
      this.paymentDate = payment.paymentDate;
      this.amount = payment.amount;
      this.order = payment.order;
    }
  }