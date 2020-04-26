import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {StaffManagementComponent} from "./staff-management.component";
import {StaffManagementRoutingModule} from "./staff-management-routing.module";

@NgModule({
  declarations: [
    StaffManagementComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    StaffManagementRoutingModule,
    SharedModule
  ]
})
export class StaffManagementModule {}
