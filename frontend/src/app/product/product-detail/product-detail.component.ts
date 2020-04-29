import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {Image} from "../image.model";
import {ProductApiService} from "../../api/product-api.service";
import {ActivatedRoute} from "@angular/router";
import {ImageApiService} from "../../api/image-api.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  imageUrls: string[] = [];
  id: number;

  constructor(private productApiService: ProductApiService, private imageApiService: ImageApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productApiService.getProduct(theProductId).subscribe((productData: Product) => {
      this.product = productData;
    });
    this.imageApiService.getImages(theProductId).subscribe(
      (imagesData: Image[]) => {
        for (let image of imagesData) {
          this.imageUrls.push('data:image/jpeg;base64,' + image.picByte);
        }
      }
    );
  }
}
