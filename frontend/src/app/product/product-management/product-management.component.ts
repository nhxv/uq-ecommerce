import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductService} from "../product.service";
import {Product} from "../product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSub: Subscription;

  constructor(private modalService: NgbModal, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productsSub = this.productService.productsChanged.subscribe((productsData: Product[]) => {
      this.products = productsData;
    });
  }

  onAdd() {
    const modalRef =this.modalService.open(ProductFormComponent);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }


}
