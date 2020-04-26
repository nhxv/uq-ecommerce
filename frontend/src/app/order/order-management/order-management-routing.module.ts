import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrderManagementComponent} from "./order-management.component";

const orderManagementRoutes: Routes = [{path: '', component: OrderManagementComponent}];
@NgModule({
  imports: [RouterModule.forChild(orderManagementRoutes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule {}
