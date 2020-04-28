import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {Image} from "../image.model";
import {ProductApiService} from "../../api/product-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  images: Image[];
  id: number;

  constructor(private productApiService: ProductApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productApiService.getProduct(theProductId).subscribe(
      (data: Product) => {
        this.product = data;
        this.images = this.product.images;
        console.log("image detail: " + JSON.stringify(this.images));
      }
    )
  }
}
