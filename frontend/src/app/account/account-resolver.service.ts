import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AccountService} from "./account.service";
import {Account} from "./account.model";

@Injectable({providedIn: 'root'})
export class AccountResolverService implements Resolve<Account[]> {
  constructor(private accountService: AccountService) {}

  // resolve will auto subscribe to know when the data get there
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account[]> | Promise<Account[]> | Account[] | any {
    return this.accountService.fetchAccountList();
  }
}
