import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'product-management', loadChildren: () => import('./product/product-management/product-management.module').then(m => m.ProductManagementModule)},
  {path: 'profile', loadChildren: () => import('./account/account-profile/account-profile.module').then(m => m.AccountProfileModule)},
  {path: 'staff-management', loadChildren: () => import('./account/account-profile/account-profile.module').then(m => m.AccountProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule {}
