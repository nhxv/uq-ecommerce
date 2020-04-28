import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {ProductApiService} from "../../api/product-api.service";
import {Subscription} from "rxjs";
import {ProductService} from "../product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  public news: any;
  productsSub: Subscription;

  constructor(private productApiService: ProductApiService, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.productsSub = this.productService.productsChanged.subscribe((productsData: Product[]) => {
    //   this.products = productsData;
    // });
    this.productApiService.getProductList().subscribe((productsData: Product[]) => {
      this.products = productsData;
    });
  }
}
