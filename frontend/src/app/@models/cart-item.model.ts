export class CartItem {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string,
    public color: string,
    public size: string,
    public quantity: number,
    public unitPrice: number,
    public available: boolean
  ) {}
}
