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
import {ProductResolverService} from "./product/product-resolver.service";
import {AccountResolverService} from "./account/account-resolver.service";
import {AdminGuard} from "./auth/admin.guard";
import {StaffGuard} from "./auth/staff.guard";
import {UserGuard} from "./auth/user.guard";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent, canActivate: [UserGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [StaffGuard]},
  {path: 'product-management', component: ProductManagementComponent, resolve: [ProductResolverService], canActivate: [StaffGuard]},
  {path: 'profile', component: AccountProfileComponent, canActivate: [UserGuard]},
  {path: 'customer-management', component: CustomerManagementComponent, resolve: [AccountResolverService], canActivate: [AdminGuard]},
  {path: 'staff-management', component: StaffManagementComponent, resolve : [AccountResolverService], canActivate: [AdminGuard]},
  {path: 'order-management', component: OrderManagementComponent, canActivate: [StaffGuard]},
  {path: 'products', component: ProductListComponent, resolve: [ProductResolverService]},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule {}
