import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {AccountProfileRoutingModule} from "../../account/account-profile/account-profile-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {NewComponent} from "./new.component";
import {NewRoutingModule} from "./new-routing.module";

@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NewRoutingModule,
    SharedModule
  ]
})
export class NewModule {}
