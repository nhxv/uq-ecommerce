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
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductManagementComponent} from "./product/product-management/product-management.component";
import {AccountProfileComponent} from "./account/account-profile/account-profile.component";
import {CustomerManagementComponent} from "./account/customer-management/customer-management.component";
import {StaffManagementComponent} from "./account/staff-management/staff-management.component";
import {OrderManagementComponent} from "./order/order-management/order-management.component";
import {NewListComponent} from "./new/new-list/new-list.component";
import {NewDetailComponent} from "./new/new-detail/new-detail.component";
import {ProductFormComponent} from "./product/product-management/product-form/product-form.component";
import {CartItemComponent} from "./cart/cart-item/cart-item.component";
import {HomeItemComponent} from "./home/home-item/home-item.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HomeItemComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CartItemComponent,
    DashboardComponent,
    ProductManagementComponent,
    ProductFormComponent,
    AccountProfileComponent,
    CustomerManagementComponent,
    StaffManagementComponent,
    OrderManagementComponent,
    NewListComponent,
    NewDetailComponent,
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
