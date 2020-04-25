import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category.model";
import {Subscription} from "rxjs";

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

  constructor(private authService : AuthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryList();
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

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
