import {NgModule} from "@angular/core";
import {ProductManagementComponent} from "./product-management.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProductManagementRoutingModule} from "./product-management-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ProductManagementRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class ProductManagementModule {}
