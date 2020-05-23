import {Account} from "../@models/account.model";
import {AccountApiService} from "../api/account-api.service";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AccountService {
  accounts: Account[] = [];
  accountsChanged = new BehaviorSubject<Account[]>(this.accounts.slice());
  account: Account = null;
  accountChanged = new BehaviorSubject({...this.account});
  updateStatus: boolean = false;
  updateStatusChanged = new BehaviorSubject(this.updateStatus);

  constructor(private accountApiService: AccountApiService, private authService: AuthService) {}

  fetchAccountByEmail(email: string) {
    this.accountApiService.getAccountByEmail(email).subscribe((data) => {
      this.setAccount(data);
    });
  }

  setAccount(account) {
    this.account = account;
    this.accountChanged.next({...this.account});
  }

  setUpdateStatus() {
    this.updateStatus = true;
    this.updateStatusChanged.next(this.updateStatus);
  }

  updateRole(id: number, account) {
    this.accountApiService.updateRole(id, account).subscribe(() => {
      this.setUpdateStatus();
    })
  }
}
