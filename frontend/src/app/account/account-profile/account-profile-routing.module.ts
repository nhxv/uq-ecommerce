import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccountProfileComponent} from "./account-profile.component";

const accountProfileRoutes: Routes = [{path: '', component: AccountProfileComponent}];
@NgModule({
  imports: [RouterModule.forChild(accountProfileRoutes)],
  exports: [RouterModule]
})
export class AccountProfileRoutingModule {}
