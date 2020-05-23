import {NgModule} from "@angular/core";
import {CartPageComponent} from "./cart-page.component";
import {CartComponent} from "../@components/cart/cart.component";
import {CartItemComponent} from "../@components/cart/cart-item/cart-item.component";
import {SharedModule} from "../../@shared/shared.module";
import {CartPageRoutingModule} from "./cart-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CartPageComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CartPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class CartPageModule {}
