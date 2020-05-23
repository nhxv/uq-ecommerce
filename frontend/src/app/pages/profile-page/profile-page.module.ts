import {NgModule} from "@angular/core";
import {SharedModule} from "../../@shared/shared.module";
import {ProfilePageComponent} from "./profile-page.component";
import {AccountProfileComponent} from "../@components/account-profile/account-profile.component";
import {ProfilePageRoutingModule} from "./profile-page-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ProfilePageComponent,
    AccountProfileComponent
  ],
  imports: [
    SharedModule,
    ProfilePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class ProfilePageModule {}
