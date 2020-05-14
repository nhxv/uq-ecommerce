import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../account/account.model";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {AccountStatService} from "../account/account-stat.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private router: Router,
              private registerService: RegisterService,
              private accountStatService: AccountStatService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]),
      "password": new FormControl("",
        [
          Validators.required,
          Validators.minLength(8),
          this.cannotContainSpace,
        ]),
      "repeatPassword": new FormControl("", [
        Validators.required,
      ]),
      "name": new FormControl("", [Validators.required]),
      "address": new FormControl("", Validators.required),
      "phone": new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ]
        ),
      "agreement": new FormControl("", Validators.requiredTrue)
    }, this.passwordMatchValidator);
  }

  onRegister() {
    // invalid form
    if (!this.registerForm.valid) {
      this.errorMessage = "Đăng kí không hợp lệ";
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }

    const newAccount: Account = new Account(
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('name').value,
      this.registerForm.get('address').value,
      this.registerForm.get('phone').value,
    );
    this.registerService.register(newAccount).subscribe((data) => {
      this.accountStatService.whenRegisterCustomer();
      this.router.navigate(['/login']);
    }, errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('repeatPassword').value ? null : {'mismatch': true};
  }

  isInvalidField(field: string): boolean {
    return !this.registerForm.get(field).valid && this.registerForm.get(field).touched;
  }

  public cannotContainSpace(control: FormControl) {
    if ((control.value as string).indexOf(' ') >= 0){
      return {cannotContainSpace: true};
    }
    return null;
  }
}
