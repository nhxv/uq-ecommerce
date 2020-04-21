export class Account {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public address: string,
    public phone: string,
    public id?: number
  ) {}
}
