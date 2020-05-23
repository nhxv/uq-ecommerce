import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderManagementPageComponent} from "./order-management-page.component";
import {StaffGuard} from "../../auth/guards/staff.guard";
import {CartResolverService} from "../../@services/cart-resolver.service";

const routes: Routes = [{path: '', component: OrderManagementPageComponent, canActivate: [StaffGuard], resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementPageRoutingModule {}
