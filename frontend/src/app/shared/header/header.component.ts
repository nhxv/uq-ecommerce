import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category.model";
import {Subscription} from "rxjs";
import {CartService} from "../../cart/cart.service";
import {CartItem} from "../../cart/cart-item/cart-item.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  isOpen = false;
  categoryList: Category[] = [];
  categorySub: Subscription;
  cartSub: Subscription;
  cartAmount: number;

  constructor(private authService : AuthService,
              private categoryService: CategoryService,
              private cartService: CartService,
              private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategoryList();
    this.cartSub = this.cartService.cartItemsChanged.subscribe((cartData: CartItem[]) => {
      this.cartAmount = cartData.length;
    });
    this.categorySub = this.categoryService.categoriesChanged.subscribe((categories: Category[]) => {
      this.categoryList = categories;
    });
  }

  onMenu() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isOpen = !this.isOpen;
  }

  onSignOut() {
    this.authService.logOut();
  }

  isAdminOrStaff(): boolean {
    return this.authService.isAdmin() || this.authService.isStaff();
  }

  isGuest(): boolean {
    return !this.authService.isUser();
  }

  onSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
