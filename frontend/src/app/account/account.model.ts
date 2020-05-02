import {Role} from "./role.model";

export class Account {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public address: string,
    public phone: string,
    public roles?: Role[],
    public id?: number
  ) {}
}
