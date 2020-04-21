import {Account} from "./account.model";
import {AccountApiService} from "../api/account-api.service";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AccountService {
  users: Account[] = [];
  usersChanged = new BehaviorSubject<Account[]>(this.users.slice());
  account: Account = null;
  userChanged = new BehaviorSubject({...this.account});

  constructor(private accountApiService: AccountApiService, private authService: AuthService) {}

  getUserList() {
    this.accountApiService.getUserList().subscribe((userData: Account[]) => {
      this.users = userData;
      this.usersChanged.next(this.users.slice());
    });
  }

  getAccount(email: string) {
    this.accountApiService.getUserByEmail(email).subscribe((userData: Account) => {
      this.setAccount(userData);
    });
  }

  setAccount(account: Account) {
    this.account = account;
    this.userChanged.next({...this.account});
  }

  createAccount(account: Account) {
    this.accountApiService.createUser(account).subscribe(data => {
      console.log(data);
    });
  }

  updateAccount(id: number, userUpdate: Account) {
    this.accountApiService.updateUser(id, userUpdate);
  }

  deleteAccount(id: number) {
    this.accountApiService.deleteUser(id);
  }
}
