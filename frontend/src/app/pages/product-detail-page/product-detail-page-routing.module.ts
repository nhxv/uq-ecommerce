import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";
import {ProductDetailPageComponent} from "./product-detail-page.component";

const routes: Routes = [{path: '', component: ProductDetailPageComponent, resolve: [CartResolverService]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailPageRoutingModule {}
