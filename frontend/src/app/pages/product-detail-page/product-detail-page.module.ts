import {NgModule} from "@angular/core";
import {ProductDetailPageComponent} from "./product-detail-page.component";
import {SharedModule} from "../../@shared/shared.module";
import {ProductDetailPageRoutingModule} from "./product-detail-page-routing.module";

@NgModule({
  declarations: [
    ProductDetailPageComponent
  ],
  imports: [
    SharedModule,
    ProductDetailPageRoutingModule
  ]
})
export class ProductDetailPageModule {}
