import {NgModule} from "@angular/core";
import {OrderManagementPageComponent} from "./order-management-page.component";
import {OrderManagementComponent} from "../@components/order-management/order-management.component";
import {SharedModule} from "../../@shared/shared.module";
import {OrderManagementPageRoutingModule} from "./order-management-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    OrderManagementPageComponent,
    OrderManagementComponent
  ],
  imports: [
    SharedModule,
    OrderManagementPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class OrderManagementPageModule {}
