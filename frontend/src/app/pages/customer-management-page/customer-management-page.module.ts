import {NgModule} from "@angular/core";
import {CustomerManagementPageComponent} from "./customer-management-page.component";
import {CustomerManagementComponent} from "../@components/customer-management/customer-management.component";
import {CustomerEditComponent} from "../@components/customer-management/customer-edit/customer-edit.component";
import {SharedModule} from "../../@shared/shared.module";
import {CustomerManagementPageRoutingModule} from "./customer-management-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CustomerManagementPageComponent,
    CustomerManagementComponent,
    CustomerEditComponent
  ],
  imports: [
    SharedModule,
    CustomerManagementPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class CustomerManagementPageModule {}
