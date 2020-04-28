import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CartComponent} from "./cart/cart.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductManagementComponent} from "./product/product-management/product-management.component";
import {AccountProfileComponent} from "./account/account-profile/account-profile.component";
import {CustomerManagementComponent} from "./account/customer-management/customer-management.component";
import {StaffManagementComponent} from "./account/staff-management/staff-management.component";
import {OrderManagementComponent} from "./order/order-management/order-management.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'product-management', component: ProductManagementComponent},
  {path: 'profile', component: AccountProfileComponent},
  {path: 'customer-management', component: CustomerManagementComponent},
  {path: 'staff-management', component: StaffManagementComponent},
  {path: 'order-management', component: OrderManagementComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule {}
