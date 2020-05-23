import {NgModule} from "@angular/core";
import {SharedModule} from "../../@shared/shared.module";
import { ProductDetailPageComponent } from '../product-detail-page/product-detail-page.component';
import {ProductsPageComponent} from "./products-page.component";
import {ProductsPageRoutingModule} from "./products-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProductsPageComponent
  ],
  imports: [
    SharedModule,
    ProductsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class ProductsPageModule {}
