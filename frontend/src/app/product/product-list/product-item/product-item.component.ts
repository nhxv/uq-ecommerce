import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../product.model";
import {ImageApiService} from "../../../api/image-api.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productInput: Product;
  @Input() id: number;
  imageUrl: string = '';

  constructor(private imageApiService: ImageApiService) {}

  ngOnInit(): void {
    console.log(this.productInput);
    this.imageUrl = this.productInput.images[0].imagePath;
  }
}
