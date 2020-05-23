import {Role} from "./role.model";
import {AccountOrder} from "./account-order.model";

export class Account {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public address: string,
    public phone: string,
    public roles?: Role[],
    public cmnd?: string,
    public age?: number,
    public salary?: number,
    public accountOrders?: AccountOrder[],
    public dateHired?: string,
    public orderWork?: number,
    public productWork?: number,
    public id?: number
  ) {}
}
