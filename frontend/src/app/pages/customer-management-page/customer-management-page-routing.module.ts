import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CustomerManagementPageComponent} from "./customer-management-page.component";
import {AdminGuard} from "../../auth/guards/admin.guard";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{path: '', component: CustomerManagementPageComponent, canActivate: [AdminGuard], resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementPageRoutingModule {}
