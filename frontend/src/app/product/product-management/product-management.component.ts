import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductService} from "../product.service";
import {Product} from "../product.model";
import {Subscription} from "rxjs";
import {Category} from "../../category/category.model";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[] = [];
  productsSub: Subscription;

  constructor(private modalService: NgbModal, private productService: ProductService) {}

  ngOnInit(): void {
    this.productsSub = this.productService.productsChanged.subscribe((productsData: Product[]) => {
      this.products = productsData;
      for(let product of productsData) {
        console.log(product.category);
      }
    });
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
