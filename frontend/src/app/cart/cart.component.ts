import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "./cart-item/cart-item.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AccountService} from "../account/account.service";
import {Account} from "../account/account.model";

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
  account: Account;
  accountSub: Subscription;

  constructor(private cartService: CartService,
              private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
    this.accountService.fetchAccountByEmail(sessionStorage.getItem('username'));
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
    this.accountSub = this.accountService.accountChanged.subscribe((data: Account) => {
      this.account = data;
    })
  }

  onNavigate() {
    this.router.navigate(['/products']);
  }

  onEditProfile() {
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.accountSub.unsubscribe();
  }

}
