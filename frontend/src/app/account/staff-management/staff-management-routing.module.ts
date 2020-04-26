import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StaffManagementComponent} from "./staff-management.component";

const staffManagementRoutes: Routes = [{path: '', component: StaffManagementComponent}];
@NgModule({
  imports: [RouterModule.forChild(staffManagementRoutes)],
  exports: [RouterModule]
})
export class StaffManagementRoutingModule {}
