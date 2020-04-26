import { Component, OnInit } from '@angular/core';
import {Product} from "../../product/product.model";
import {ProductService} from "../../product/product.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  newProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList();
    this.productService.productsChanged.subscribe((products: Product[]) => {
      this.newProducts = products;
    });
  }

}
