import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "./cart-item/cart-item.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AccountService} from "../account/account.service";
import {Account} from "../account/account.model";
import {OrderApiService} from "../api/order-api.service";
import {AccountOrder} from "../order/account-order.model";
import {ProductOrder} from "../order/product-order.model";
import {OrderService} from "../order/order.service";
import {AccountStatService} from "../account/account-stat.service";
import {OrderStatService} from "../order/order-stat.service";

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
  errorMessage: string = '';
  disabledItems: string[] = [];

  constructor(private cartService: CartService,
              private accountService: AccountService,
              private orderApiService: OrderApiService,
              private orderService: OrderService,
              private accountStatService: AccountStatService,
              private orderStatService: OrderStatService,
              private router: Router) {}

  ngOnInit(): void {
    // get account info
    this.accountService.fetchAccountByEmail(sessionStorage.getItem('username'));
    // when customer update cart
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

  onOrder() {
    let isOrder: boolean = confirm("Thông tin cá nhân (địa chỉ, điện thoại) không thể thay đổi sau khi thanh toán. Bạn chắc chắn muốn thanh toán bây giờ không?")
    if (!isOrder) {
      return;
    } else {
      // check item availability
      for (let item of this.cartItems) {
        if (!item.available) {
          this.disabledItems.push(item.name);
        }
      }
      if (this.disabledItems.length !== 0) {
        this.errorMessage = 'Sản phẩm sau đây đã hết hàng, xin hãy xoá khỏi giỏ hàng để có thể thanh toán lúc này:';
        setTimeout(() => {
          this.errorMessage = '';
          this.disabledItems = [];
        }, 3000);
        return;
      }
      const productOrders: ProductOrder[] = [];
      for (let item of this.cartItems) {
        const productOrder = new ProductOrder(item.color, item.size, item.imageUrl, item.name, item.quantity, item.unitPrice, item.id);
        productOrders.push(productOrder);
      }
      // 3 states: PROCESSING, DELIVERED, RETURN
      const accountOrder: AccountOrder = new AccountOrder(
        productOrders,
        'PROCESSING',
        this.account,
        this.account.name,
        this.account.email,
        this.account.address,
        this.account.phone,
        this.total);

      this.orderApiService.addOrder(accountOrder).subscribe(() => {
        this.orderService.setUpdateStatus();
        this.cartService.clearCart();
        this.orderStatService.whenOrder();
        if (sessionStorage.getItem('role') === 'CUSTOMER') {
          this.accountStatService.whenCustomerOrder();
        }
        this.router.navigate(['/home']);
      });
    }
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.accountSub.unsubscribe();
  }
}
