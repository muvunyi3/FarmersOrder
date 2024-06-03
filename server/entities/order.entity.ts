  import { Farmer } from './farmers.entity';
  import { ProductEntity } from './product.entity';
  
  export interface Order {
    orderId: number;
    farmerId: number;
    orderDate: Date;
    landSize: number;
    paymentStatus: string;
    shippingAddress: string;
    farmer?: Farmer;
    products: ProductEntity[];
  }
  
  export class OrderEntity implements Order {
    orderId: number;
    farmerId: number;
    orderDate: Date;
    landSize: number;
    paymentStatus: string;
    shippingAddress: string;
    farmer?: Farmer;
    products: ProductEntity[];
  
    constructor(order: Order) {
      this.orderId = order.orderId;
      this.farmerId = order.farmerId;
      this.orderDate = order.orderDate;
      this.landSize = order.landSize;
      this.paymentStatus = order.paymentStatus;
      this.shippingAddress = order.shippingAddress;
      this.farmer = order.farmer;
      this.products = order.products;
    }
  }