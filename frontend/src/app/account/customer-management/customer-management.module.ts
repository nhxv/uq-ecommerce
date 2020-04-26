import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CustomerManagementComponent} from "./customer-management.component";
import {CustomerManagementRoutingModule} from "./customer-management-routing.module";

@NgModule({
  declarations: [
    CustomerManagementComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    CustomerManagementRoutingModule,
    SharedModule
  ]
})
export class CustomerManagementModule {}
