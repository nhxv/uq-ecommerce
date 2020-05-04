import {Account} from "./account.model";
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

  constructor(private accountApiService: AccountApiService, private authService: AuthService) {}

  fetchAccountList() {
    this.accountApiService.getAccountList().subscribe((accountsData: Account[]) => {
      this.accounts = accountsData;
      this.accountsChanged.next(this.accounts.slice());
    });
  }

  getAccounts() {
    return this.accounts.slice();
  }

  fetchAccountByEmail(email: string) {
    this.accountApiService.getAccountByEmail(email).subscribe((accountsData: Account) => {
      this.setAccount(accountsData);
    });
  }

  getAccount(id: number) {
    for (let account of this.accounts) {
      if (account.id === id) {
        return account;
      }
    }
  }

  setAccount(account: Account) {
    this.account = account;
    this.accountChanged.next({...this.account});
  }

  createAccount(account: Account) {
    this.accountApiService.createAccount(account).subscribe((accountData: Account) => {
      if (accountData) {
        this.accounts.push(accountData);
        this.accountsChanged.next(this.accounts.slice());
      }
    });
  }

  updateAccount(id: number, accountUpdate: Account) {
    this.accountApiService.updateAccount(id, accountUpdate).subscribe(() => {
      const updateIndex = this.accounts.indexOf(this.getAccount(id));
      this.accounts[updateIndex] = accountUpdate;
      this.accountsChanged.next(this.accounts.slice());
    });
  }

  updateRole(id: number, account) {
    this.accountApiService.updateRole(id, account).subscribe(() => {
      this.fetchAccountList();
    })
  }

  deleteAccount(id: number) {
    this.accountApiService.deleteAccount(id).subscribe(() => {
      const deletedIndex = this.accounts.indexOf(this.getAccount(id));
      this.accounts.splice(deletedIndex, 1);
      this.accountsChanged.next(this.accounts.slice());
    });
  }
}
