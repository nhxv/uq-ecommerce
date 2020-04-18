import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    NgbModule
  ]
})
export class LoginModule {}
