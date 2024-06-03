// product.entity.ts
export interface Product {
    productId: number;
    name: string;
    description: string;
    quantity: number;
  }
  
  export class ProductEntity implements Product {
    productId: number;
    name: string;
    description: string;
    quantity: number;
  
    constructor(product: Product) {
      this.productId = product.productId;
      this.name = product.name;
      this.description = product.description;
      this.quantity = product.quantity;
    }
  }