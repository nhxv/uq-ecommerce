import {NgModule} from "@angular/core";
import {HomePageComponent} from "./home-page.component";
import {SharedModule} from "../../@shared/shared.module";
import {HomePageRoutingModule} from "./home-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    SharedModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class HomePageModule {}
