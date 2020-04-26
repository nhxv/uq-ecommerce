import {NgModule} from "@angular/core";
import {AccountProfileComponent} from "../account/account-profile/account-profile.component";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {NewComponent} from "./new.component";
import {NewRoutingModule} from "./new-routing.module";
import {NewItemComponent} from "./new-list/new-item/new-item.component";
import {NewDetailComponent} from "./new-detail/new-detail.component";
import { NewListComponent } from './new-list/new-list.component';

@NgModule({
  declarations: [
    NewComponent,
    NewItemComponent,
    NewDetailComponent,
    NewListComponent
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
