import {Component, OnInit} from '@angular/core';
import {Product} from "../../product/product.model";
import {ActivatedRoute} from "@angular/router";
import {ProductApiService} from "../../api/product-api.service";
import {Image} from "../../product/image.model";

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss']
})
export class NewDetailComponent implements OnInit {
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
