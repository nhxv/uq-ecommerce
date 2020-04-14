import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    NgbModule
  ]
})
export class HomeModule {}
