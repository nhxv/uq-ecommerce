import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RegisterRoutingModule} from "./register-routing.module";
import {RegisterComponent} from "./register.component";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RegisterRoutingModule,
    NgbModule
  ]
})
export class RegisterModule {}
