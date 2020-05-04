import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "./cart-item/cart-item.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartSub: Subscription;
  isEmpty: boolean;
  total: number;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.fetchCart(sessionStorage.getItem('username'));
    this.cartSub = this.cartService.cartItemsChanged.subscribe((cartData: CartItem[]) => {
      this.cartItems = cartData;
      this.isEmpty = this.cartItems.length === 0;
      if (!this.isEmpty) {
        this.total = this.cartItems.reduce((total, item) => {
          return total + (item.unitPrice * item.quantity);
        }, 0);
      }
    });
  }

  onNavigate() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

}
