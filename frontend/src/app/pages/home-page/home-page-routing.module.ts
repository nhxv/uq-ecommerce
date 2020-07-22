import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page.component";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{path: '', component: HomePageComponent, resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
