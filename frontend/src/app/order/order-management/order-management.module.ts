import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {OrderManagementComponent} from "./order-management.component";
import {OrderManagementRoutingModule} from "./order-management-routing.module";

@NgModule({
  declarations: [
    OrderManagementComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    OrderManagementRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class OrderManagementModule {}
