import {NgModule} from "@angular/core";
import {StaffManagementPageComponent} from "./staff-management-page.component";
import {StaffManagementComponent} from "../@components/staff-management/staff-management.component";
import {StaffEditComponent} from "../@components/staff-management/staff-edit/staff-edit.component";
import {SharedModule} from "../../@shared/shared.module";
import {StaffManagementPageRoutingModule} from "./staff-management-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    StaffManagementPageComponent,
    StaffManagementComponent,
    StaffEditComponent
  ],
  imports: [
    SharedModule,
    StaffManagementPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class StaffManagementPageModule {}
