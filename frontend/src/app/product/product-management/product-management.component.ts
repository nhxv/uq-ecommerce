import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductService} from "../product.service";
import {Product} from "../product.model";
import {Subscription} from "rxjs";
import {Category} from "../../category/category.model";
import {ProductApiService} from "../../api/product-api.service";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products: Product[];
  isAnyProduct: boolean = true;
  categories: Category[] = [];
  productsSub: Subscription;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private modalService: NgbModal,
              private productService: ProductService,
              private productApiService: ProductApiService) {}

  ngOnInit(): void {
    this.listProducts();
    this.productsSub = this.productService.updateStatusChanged.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.productApiService.getAllProducts(this.pageNumber - 1, this.pageSize).subscribe(this.processCustomPageable());
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

  onAdd() {
    const modalRef = this.modalService.open(ProductFormComponent);
  }

  onEdit() {
    const modalRef = this.modalService.open(ProductFormComponent);
  }

  getCategoryName(product: Product) {
    // @ts-ignore
    if (Number.isInteger(product.category)) {
      for (let category of this.categories) {
        // @ts-ignore
        if (category.id == product.category) {
          return category.name;
        }
      }
    }
    this.categories.push(product.category);
    return product.category.name;
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
