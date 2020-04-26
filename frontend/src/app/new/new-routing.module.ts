import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewComponent} from "./new.component";
import {NewDetailComponent} from "./new-detail/new-detail.component";
import {NewListComponent} from "./new-list/new-list.component";

const newRoutes: Routes = [
  {path: '', component: NewComponent,
    children: [
      {path: '', component: NewListComponent},
      {path: ':id', component: NewDetailComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(newRoutes)],
  exports: [RouterModule]
})
export class NewRoutingModule {}
