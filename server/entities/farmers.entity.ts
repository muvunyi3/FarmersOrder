// farmer.entity.ts
export interface Farmer {
    id: number;
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
  }
  
  export class FarmerEntity implements Farmer {
    id: number;
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
  
    constructor(farmer: Farmer) {
      this.id = farmer.id;
      this.name = farmer.name;
      this.email = farmer.email;
      this.phone = farmer.phone;
      this.age = farmer.age;
      this.address = farmer.address;
    }
  }