import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  public news: any;
  productsSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSub = this.productService.productsChanged.subscribe((productsData: Product[]) => {
      this.products = productsData;
    });
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
