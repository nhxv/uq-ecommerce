import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {ProductItemComponent} from "./components/product-list/product-item/product-item.component";

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardHeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    DashboardHeaderComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent
  ]
})
export class SharedModule {}
