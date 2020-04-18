import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import {CartComponent} from "./cart.component";
import {CartRoutingModule} from "./cart-routing.module";
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CartRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class CartModule {}
