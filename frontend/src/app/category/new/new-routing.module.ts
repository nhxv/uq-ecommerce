import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewComponent} from "./new.component";

const newRoutes: Routes = [{path: '', component: NewComponent}];
@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewRoutingModule {}
