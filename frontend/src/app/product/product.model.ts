import {Color} from "./color.model";
import {Size} from "./size.model";

export class Product {
  constructor(
    public name: string,
    public description: string,
    public colors: Color[],
    public sizes: Size[],
    public category: string,
    public images: string[],
    public unitPrice: number,
    public dateCreated?: string,
    public id?: number
  ) {}
}
