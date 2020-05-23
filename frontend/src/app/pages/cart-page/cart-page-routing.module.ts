import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CartPageComponent} from "./cart-page.component";
import {UserGuard} from "../../auth/guards/user.guard";
import {CartResolverService} from "../../@services/cart-resolver.service";

const routes: Routes = [{path: '', component: CartPageComponent, canActivate: [UserGuard], resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule {}
