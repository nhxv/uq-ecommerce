import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CustomerManagementComponent} from "./customer-management.component";

const customerManagementRoutes: Routes = [{path: '', component: CustomerManagementComponent}];
@NgModule({
  imports: [RouterModule.forChild(customerManagementRoutes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule {}
