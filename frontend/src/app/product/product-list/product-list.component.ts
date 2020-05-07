import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../product.model";
import {ProductApiService} from "../../api/product-api.service";
import {Subscription} from "rxjs";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isAnyProduct: boolean = true;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private productApiService: ProductApiService,
              private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get("keyword");
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;
    this.productApiService.searchProductsByName(this.pageNumber - 1, this.pageSize, keyword).subscribe(this.processCustomPageable());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      const isNumber: boolean = Number.isInteger(+this.route.snapshot.paramMap.get('id'));
      if (!isNumber) {
        this.router.navigate(['/not-found']);
        return;
      }
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 99;
    }
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    if (hasCategoryId) {
      // get products by category
      this.productApiService.getProductsByCategory(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(this.processCustomPageable());
    } else {
      // get products by new
      this.productApiService.getAllProducts(this.pageNumber - 1, this.pageSize).subscribe(this.processCustomPageable());
    }
  }

  processCustomPageable() {
    return data => {
      this.products = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      if (this.products.length === 0) {
        this.isAnyProduct = false;
      } else {
        this.isAnyProduct = true;
      }
    };
  }

  onNavigate() {
    this.router.navigate(['/home']);
  }

  // ngOnDestroy(): void {
  //   this.productsSub.unsubscribe();
  // }
}
