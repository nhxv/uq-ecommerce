import {NgModule} from "@angular/core";
import {CategoryPageComponent} from "./category-page.component";
import {SharedModule} from "../../@shared/shared.module";
import {CategoryPageRoutingModule} from "./category-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CategoryPageComponent
  ],
  imports: [
    SharedModule,
    CategoryPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class CategoryPageModule {}
