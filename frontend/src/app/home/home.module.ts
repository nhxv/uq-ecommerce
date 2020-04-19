import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared/shared.module";
import { HomeItemComponent } from './home-item/home-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeItemComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class HomeModule {}
