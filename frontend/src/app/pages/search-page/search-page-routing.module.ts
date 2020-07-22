import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchPageComponent} from "./search-page.component";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{path: '', component: SearchPageComponent, resolve: [CartResolverService]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPageRoutingModule {}
