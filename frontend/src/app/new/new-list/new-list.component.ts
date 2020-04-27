import { Component, OnInit } from '@angular/core';
import {Product} from "../../product/product.model";
import {ProductService} from "../../product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductApiService} from "../../api/product-api.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
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
