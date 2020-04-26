import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {NewComponent} from "./new.component";
import {NewRoutingModule} from "./new-routing.module";
import {NewItemComponent} from "./new-item/new-item.component";

@NgModule({
  declarations: [
    NewComponent,
    NewItemComponent
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
