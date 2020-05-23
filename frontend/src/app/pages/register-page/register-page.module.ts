import {NgModule} from "@angular/core";
import {RegisterPageComponent} from "./register-page.component";
import {RegisterComponent} from "../@components/register/register.component";
import {SharedModule} from "../../@shared/shared.module";
import {RegisterPageRoutingModule} from "./register-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    RegisterPageComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    RegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class RegisterPageModule {}
