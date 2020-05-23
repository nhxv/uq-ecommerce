import {NgModule} from "@angular/core";
import {OrdersPageComponent} from "./orders-page.component";
import {OrderListComponent} from "../@components/order-list/order-list.component";
import {SharedModule} from "../../@shared/shared.module";
import {OrdersPageRoutingModule} from "./orders-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    OrdersPageComponent,
    OrderListComponent,
  ],
  imports: [
    SharedModule,
    OrdersPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class OrdersPageModule {}
