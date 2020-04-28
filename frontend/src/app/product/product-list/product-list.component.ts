import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductApiService} from "../../api/product-api.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productApiService: ProductApiService) { }

  ngOnInit(): void {
    this.productApiService.getProductList().subscribe((productsData: Product[]) => {
      console.log(productsData);
      for (let item of productsData) {
        console.log(item);
      }
      this.products = productsData;
    });
  }
}
