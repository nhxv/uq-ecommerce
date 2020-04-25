import {Color} from "./color.model";
import {Size} from "./size.model";
import {Category} from "../category/category.model";

export class Product {
  constructor(
    public name: string,
    public description: string,
    public category: Category,
    public colors: Color[],
    public sizes: Size[],
    public images: string[],
    public unitPrice: number,
    public dateCreated?: string,
    public id?: number
  ) {}
}
