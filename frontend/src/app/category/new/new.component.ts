import { Component, OnInit } from '@angular/core';
import {Product} from "../../product/product.model";
import {ProductService} from "../../product/product.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList();
    this.productService.productsChanged.subscribe((products: Product[]) => {
      this.newProducts = products;
    });
  }

}
