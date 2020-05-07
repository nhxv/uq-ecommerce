import {Role} from "./role.model";

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
    public accountOrder?: string,
    public id?: number
  ) {}
}
