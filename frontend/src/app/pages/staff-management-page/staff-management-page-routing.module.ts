import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StaffManagementPageComponent} from "./staff-management-page.component";
import {AdminGuard} from "../../auth/guards/admin.guard";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{path: '', component: StaffManagementPageComponent, canActivate: [AdminGuard], resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManagementPageRoutingModule {}
