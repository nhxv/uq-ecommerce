import {ProductOrder} from "./product-order.model";
import {Account} from "../account/account.model";

export class AccountOrder {
  constructor(
    public productOrders: ProductOrder[],
    public status: string,
    public account: Account,
    public name: string,
    public email: string,
    public address: string,
    public phone: string,
    public totalPrice: number,
    public dateCreated?: string,
    public id?: number
  ) {}
}
