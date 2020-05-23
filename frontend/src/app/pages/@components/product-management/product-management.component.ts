import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductService} from "../../../@services/product.service";
import {Product} from "../../../@models/product.model";
import {Subscription} from "rxjs";
import {Category} from "../../../@models/category.model";
import {ProductApiService} from "../../../api/product-api.service";
import {AuthService} from "../../../auth/auth.service";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {CartService} from "../../../@services/cart.service";
import {ProductStatService} from "../../../@services/product-stat.service";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products: Product[];
  isAnyProduct: boolean = true;
  productsSub: Subscription;
  @Input() product: Product;
  stats: number[];
  statSub: Subscription;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private modalService: NgbModal,
              private productService: ProductService,
              private productApiService: ProductApiService,
              private productStatService: ProductStatService,
              private authService: AuthService,
              private cartService: CartService) {}

  ngOnInit(): void {
    if (this.productStatService.getStats().length !== 0) {
      this.stats = this.productStatService.getStats();
    } else {
      this.productStatService.fetchStats();
    }
    this.statSub = this.productStatService.statsChanged.subscribe((data) => {
      this.stats = data;
    });
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

  onAddProduct() {
    const modalRef = this.modalService.open(ProductFormComponent);
  }

  onEditProduct(currentProduct: Product) {
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = currentProduct;
  }

  onChangeAvailability(product: Product, isAvailable: boolean) {
    const productUpdate: Product = new Product(
      product.name,
      product.description,
      null,
      product.colors,
      product.sizes,
      product.images,
      product.unitPrice,
      isAvailable
    );
    this.productApiService.updateProduct(product.id, productUpdate).subscribe((product: Product) => {
      this.productService.setUpdateStatus();
      this.productStatService.whenChangeProductStatus(isAvailable);
      this.cartService.updateCartItemInfo(product);
    })
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
    this.statSub.unsubscribe();
  }
}
