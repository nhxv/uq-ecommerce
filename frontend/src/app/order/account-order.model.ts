import {ProductOrder} from "./product-order.model";

export class AccountOrder {
  constructor(
    public productOrders: ProductOrder[],
    public dateCreated: string,
    public status: string,
    public id?: number
  ) {
  }
}
