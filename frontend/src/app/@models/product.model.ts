import {Color} from "./color.model";
import {Size} from "./size.model";
import {Category} from "./category.model";
import {Image} from "./image.model";

export class Product {
  constructor(
    public name: string,
    public description: string,
    public category: Category,
    public colors: Color[],
    public sizes: Size[],
    public images: Image[],
    public unitPrice: number,
    public available: boolean,
    public dateCreated?: string,
    public id?: number
  ) {}
}
