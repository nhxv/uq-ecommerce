import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {TokenInterceptor} from "./auth/token-interceptor.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import {SharedModule} from "./shared/shared.module";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CartComponent} from "./cart/cart.component";
import {ProductManagementComponent} from "./product/product-management/product-management.component";
import {AccountProfileComponent} from "./account/account-profile/account-profile.component";
import {CustomerManagementComponent} from "./account/customer-management/customer-management.component";
import {StaffManagementComponent} from "./account/staff-management/staff-management.component";
import {OrderManagementComponent} from "./order/order-management/order-management.component";
import {ProductFormComponent} from "./product/product-management/product-form/product-form.component";
import {CartItemComponent} from "./cart/cart-item/cart-item.component";
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductItemComponent } from './product/product-list/product-item/product-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ProductEditComponent } from './product/product-management/product-edit/product-edit.component';
import { CustomerEditComponent } from './account/customer-management/customer-edit/customer-edit.component';
import { StaffEditComponent } from './account/staff-management/staff-edit/staff-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CartItemComponent,
    ProductManagementComponent,
    ProductFormComponent,
    AccountProfileComponent,
    CustomerManagementComponent,
    StaffManagementComponent,
    OrderManagementComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    NotFoundComponent,
    OrderListComponent,
    ProductEditComponent,
    CustomerEditComponent,
    StaffEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
