import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  {path: 'register', loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule)},
  {path: 'cart', loadChildren: () => import('./pages/cart-page/cart-page.module').then(m => m.CartPageModule)},
  {path: 'profile', loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.ProfilePageModule)},
  {path: 'orders', loadChildren: () => import('./pages/orders-page/orders-page.module').then(m => m.OrdersPageModule)},
  {path: 'product-management', loadChildren: () => import('./pages/product-management-page/product-management-page.module').then(m => m.ProductManagementPageModule)},
  {path: 'customer-management', loadChildren: () => import('./pages/customer-management-page/customer-management-page.module').then(m => m.CustomerManagementPageModule)},
  {path: 'staff-management', loadChildren: () => import('./pages/staff-management-page/staff-management-page.module').then(m => m.StaffManagementPageModule)},
  {path: 'order-management', loadChildren: () => import('./pages/order-management-page/order-management-page.module').then(m => m.OrderManagementPageModule)},
  {path: 'products', loadChildren: () => import('./pages/products-page/products-page.module').then(m => m.ProductsPageModule)},
  {path: 'products/:id', loadChildren: () => import('./pages/product-detail-page/product-detail-page.module').then(m => m.ProductDetailPageModule)},
  {path: 'category/:id', loadChildren: () => import('./pages/category-page/category-page.module').then(m => m.CategoryPageModule)},
  {path: 'search/:keyword', loadChildren: () => import('./pages/search-page/search-page.module').then(m => m.SearchPageModule)},
  {path: 'not-found', loadChildren: () => import('./pages/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule {}
