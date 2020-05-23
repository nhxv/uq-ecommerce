import {NgModule} from "@angular/core";
import {SearchPageComponent} from "./search-page.component";
import {SharedModule} from "../../@shared/shared.module";
import {SearchPageRoutingModule} from "./search-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    SharedModule,
    SearchPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class SearchPageModule {}
