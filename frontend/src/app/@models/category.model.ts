import {Product} from "./product.model";

export class Category {
  constructor(
    public name: string,
    public products?: Product[],
    public id?: number
  ) {}
}
