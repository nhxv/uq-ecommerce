import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundPageComponent} from "./not-found-page.component";
import {CartResolverService} from "../../@services/cart-resolver.service";

const routes: Routes = [{path: '', component: NotFoundPageComponent, resolve: [CartResolverService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundPageRoutingModule {}
