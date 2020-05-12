import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CartComponent} from "./cart/cart.component";
import {ProductManagementComponent} from "./product/product-management/product-management.component";
import {AccountProfileComponent} from "./account/account-profile/account-profile.component";
import {CustomerManagementComponent} from "./account/customer-management/customer-management.component";
import {StaffManagementComponent} from "./account/staff-management/staff-management.component";
import {OrderManagementComponent} from "./order/order-management/order-management.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {AdminGuard} from "./auth/admin.guard";
import {StaffGuard} from "./auth/staff.guard";
import {UserGuard} from "./auth/user.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {CartResolverService} from "./cart/cart-resolver.service";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, resolve: [CartResolverService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent, canActivate: [UserGuard], resolve: [CartResolverService]},
  {path: 'product-management', component: ProductManagementComponent, canActivate: [StaffGuard], resolve: [CartResolverService]},
  {path: 'profile', component: AccountProfileComponent, canActivate: [UserGuard], resolve: [CartResolverService]},
  {path: 'customer-management', component: CustomerManagementComponent, canActivate: [AdminGuard], resolve: [CartResolverService]},
  {path: 'staff-management', component: StaffManagementComponent, canActivate: [AdminGuard], resolve: [CartResolverService]},
  {path: 'order-management', component: OrderManagementComponent, canActivate: [StaffGuard], resolve: [CartResolverService]},
  {path: 'products', component: ProductListComponent, resolve: [CartResolverService]},
  {path: 'products/:id', component: ProductDetailComponent, resolve: [CartResolverService]},
  {path: 'category/:id', component: ProductListComponent, resolve: [CartResolverService]},
  {path: 'category', component: ProductListComponent, resolve: [CartResolverService]},
  {path: 'search/:keyword', component: ProductListComponent, resolve: [CartResolverService]},
  {path: 'order-list', component: OrderListComponent, canActivate: [UserGuard], resolve: [CartResolverService]},
  {path: 'not-found', component: NotFoundComponent, resolve: [CartResolverService]},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule {}
