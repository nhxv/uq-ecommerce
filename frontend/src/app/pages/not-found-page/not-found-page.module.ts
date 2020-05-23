import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./not-found-page.component";
import {NotFoundComponent} from "../@components/not-found/not-found.component";
import {SharedModule} from "../../@shared/shared.module";
import {NotFoundPageRoutingModule} from "./not-found-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NotFoundPageComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    NotFoundPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class NotFoundPageModule {}
