import {NgModule} from "@angular/core";
import {SharedModule} from "../../@shared/shared.module";
import {ProductManagementPageComponent} from "./product-management-page.component";
import {ProductManagementComponent} from "../@components/product-management/product-management.component";
import {ProductManagementPageRoutingModule} from "./product-management-page-routing.module";
import {ProductFormComponent} from "../@components/product-management/product-form/product-form.component";
import {ProductEditComponent} from "../@components/product-management/product-edit/product-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProductManagementPageComponent,
    ProductManagementComponent,
    ProductFormComponent,
    ProductEditComponent
  ],
  imports: [
    SharedModule,
    ProductManagementPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class ProductManagementPageModule {}
