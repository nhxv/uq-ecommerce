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
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productsSub: Subscription;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private productApiService: ProductApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    // this.productsSub = this.productService.productsChanged.subscribe((productsData: Product[]) => {
    //   this.products = productsData;
    // });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      console.log('search mode todo');
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 99;
    }
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    if (hasCategoryId) {
      this.productApiService.getProductsByCategory(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processCustomPageable());
    } else {
      this.productApiService.getAllProducts(this.pageNumber - 1, this.pageSize).subscribe(this.processCustomPageable());
    }
  }

  processCustomPageable() {
    return data => {
      this.products = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    };
  }

  processJpaPageable() {
    return data => {
      console.log(data);
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  // ngOnDestroy(): void {
  //   this.productsSub.unsubscribe();
  // }
}
