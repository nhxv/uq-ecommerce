import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoryPageComponent} from "./category-page.component";
import {CartResolverService} from "../../@services/resolvers/cart-resolver.service";

const routes: Routes = [{
    path: '', component: CategoryPageComponent, resolve: [CartResolverService],
    children: [{path: ':id', component: CategoryPageComponent}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryPageRoutingModule {}
