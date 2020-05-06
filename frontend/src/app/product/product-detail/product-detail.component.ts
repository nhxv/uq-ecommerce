import { Component, OnInit } from '@angular/core';
import {Product} from "../product.model";
import {Image} from "../image.model";
import {ProductApiService} from "../../api/product-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageApiService} from "../../api/image-api.service";
import {CartService} from "../../cart/cart.service";
import {CartItem} from "../../cart/cart-item/cart-item.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  imageUrls: string[] = [];
  id: number;
  quantities: number[] = [1, 2, 3, 4, 5];
  quantitySelected: number = null;
  colorSelected: string = null;
  sizeSelected: string = null;
  bigImageUrl: string = null;
  errorMessage: string = '';

  constructor(private productApiService: ProductApiService,
              private imageApiService: ImageApiService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    if (!Number.isInteger(theProductId)) {
      this.router.navigate(['/not-found']);
      return;
    }
    this.productApiService.getProduct(theProductId).subscribe((productData: Product) => {
      this.product = productData;
      if (this.product) {
        for (let img of this.product.images) {
          this.imageUrls.push(img.imagePath);
        }
        this.bigImageUrl = this.imageUrls[0];
      }
    });
  }

  onChangeImage(index: number) {
    this.bigImageUrl = this.imageUrls[index];
  }

  onSetColor(color: string) {
    this.colorSelected = color;
  }

  onSetSize(size: string) {
    this.sizeSelected = size;
  }

  onSetQuantity(quantity: number) {
    this.quantitySelected = quantity;
  }

  onAddToCart() {
    if (!this.authService.isUser()) {
      this.errorMessage = 'Quý khách đăng nhập để sử dụng giỏ hàng.';
      setTimeout(() => {this.errorMessage = '';}, 2000);
      return;
    } else {
      if (!this.quantitySelected) {
        this.quantitySelected = this.quantities[0];
      }
      if (!this.colorSelected) {
        this.colorSelected = this.product.colors[0].name;
      }
      if (!this.sizeSelected) {
        this.sizeSelected = this.product.sizes[0].size;
      }
      const item = new CartItem(this.product.id, this.product.name, this.imageUrls[0], this.colorSelected, this.sizeSelected, this.quantitySelected, this.product.unitPrice);
      this.cartService.addCartItem(item);
    }
  }
}
