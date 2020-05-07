export class ProductOrder {
  constructor(
    public color: string,
    public size: string,
    public imageUrl: string,
    public name: string,
    public quantity: number,
    public id?: number
  ) {
  }
}
