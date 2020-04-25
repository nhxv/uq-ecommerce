import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AccountProfileComponent} from "./account-profile.component";
import {AccountProfileRoutingModule} from "./account-profile-routing.module";

@NgModule({
  declarations: [
    AccountProfileComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    AccountProfileRoutingModule,
    SharedModule
  ]
})
export class AccountProfileModule {}
