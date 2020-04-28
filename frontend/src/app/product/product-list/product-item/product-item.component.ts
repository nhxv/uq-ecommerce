import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productInput: Product;
  @Input() id: number;
  imageUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    this.imageUrl = this.productInput.images[0].imagePath;
    console.log('Image url: ' + this.imageUrl + ' from product id: ' + this.id);
  }

}
