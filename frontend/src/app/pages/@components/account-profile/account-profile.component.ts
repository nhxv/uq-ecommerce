import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../../../@services/account.service";
import {Account} from "../../../@models/account.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountApiService} from "../../../api/account-api.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  account: Account;
  accountSub: Subscription;
  profileEditForm: FormGroup;
  errorMessage: string = '';

  constructor(private accountService: AccountService,
              private accountApiService: AccountApiService) {}

  ngOnInit(): void {
    this.accountService.fetchAccountByEmail(sessionStorage.getItem("username"));
    this.accountSub = this.accountService.accountChanged.subscribe((data: Account) => {
      this.account = data;
      if (this.account) {
        this.initForm(this.account.cmnd, this.account.age, this.account.address, this.account.phone, this.account.name);
      }
    });
  }

  initForm(cmnd: string, age: number, address: string, phone: string, name: string) {
    this.profileEditForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "cmnd": new FormControl(cmnd, [
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      "age": new FormControl(age, [
        Validators.min(0),
        Validators.max(150),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
      ]),
      "address": new FormControl(address, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(600),
      ]),
      "phone": new FormControl(phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
      ])
    });
  }

  onUpdateProfile() {
    if (!this.profileEditForm.valid) {
      this.errorMessage = 'Cập nhật không hợp lệ';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    }
    const accountUpdate: Account = new Account(
      this.account.email,
      null,
      this.profileEditForm.get('name').value,
      this.profileEditForm.get('address').value,
      this.profileEditForm.get('phone').value,
      this.account.roles,
      this.profileEditForm.get('cmnd').value,
      this.profileEditForm.get('age').value,
      this.account.salary
    );
    this.accountApiService.updateAccount(this.account.id, accountUpdate).subscribe((data: Account) => {
      this.account = data;
    })
  }

  isInvalidField(field: string) {
    return !this.profileEditForm.get(field).valid && this.profileEditForm.get(field).touched;
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }

}
