import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductManagementComponent} from "./product-management.component";

const productManagementRoutes: Routes = [{path: '', component: ProductManagementComponent}];
@NgModule({
  imports: [RouterModule.forChild(productManagementRoutes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule {}
