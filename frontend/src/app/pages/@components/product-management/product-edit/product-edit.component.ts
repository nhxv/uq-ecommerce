import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../../@models/product.model";
import {ProductApiService} from "../../../../api/product-api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ProductService} from "../../../../@services/product.service";
import {CartItem} from "../../../../@models/cart-item.model";
import {CartService} from "../../../../@services/cart.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productEditForm: FormGroup;
  @Input() product: Product;
  errorMessage: string = '';

  constructor(private activeModal: NgbActiveModal,
              private productApiService: ProductApiService,
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productEditForm = new FormGroup( {
      "name": new FormControl(this.product.name, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ]),
      "description": new FormControl(this.product.description, [
        Validators.required,
        Validators.maxLength(600),
        Validators.minLength(10)
      ]),
      "unitPrice": new FormControl(this.product.unitPrice, [
        Validators.required,
        Validators.max(10000000),
        Validators.min(1000),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
    });
  }

  onUpdateProduct() {
    if (!this.productEditForm.valid) {
      this.errorMessage = 'Thông tin sản phẩm không hợp lệ';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }

    const productUpdate: Product = new Product(
      this.productEditForm.get('name').value,
      this.productEditForm.get('description').value,
      null,
      this.product.colors,
      this.product.sizes,
      this.product.images,
      this.productEditForm.get('unitPrice').value,
      this.product.available
    );

    this.productApiService.updateProduct(this.product.id, productUpdate).pipe(catchError(this.handleEditErrors)).subscribe((data: Product) => {
      this.productService.setUpdateStatus();
      this.productEditForm.reset();
      this.activeModal.close('Close click');
      if (data) {
        this.cartService.updateCartItemInfo(data);
      }
    }, errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    })
  }

  handleEditErrors(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    // network fail -- cannot access errorResponse
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.status) {
      case 409:
        errorMessage = 'Tên sản phẩm đã tồn tại';
        break;
    }
    return throwError(errorMessage);
  }

  isInvalidField(field: string) {
    return !this.productEditForm.get(field).valid && this.productEditForm.get(field).touched;
  }

}
