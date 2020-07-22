import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrdersPageComponent} from "./orders-page.component";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{path: '', component: OrdersPageComponent, resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersPageRoutingModule {}
