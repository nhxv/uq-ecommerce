export class ProductOrder {
  constructor(
    public color: string,
    public size: string,
    public imageUrl: string,
    public name: string,
    public quantity: number,
    public unitPrice: number,
    public productId: number,
    public id?: number
  ) {
  }
}
