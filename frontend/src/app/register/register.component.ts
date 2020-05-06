import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../account/account.model";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new FormControl("",
        [
          Validators.required,
          Validators.minLength(8),
          this.cannotContainSpace,
        ]),
      "name": new FormControl("", [Validators.required]),
      "street": new FormControl("", Validators.required),
      "city": new FormControl("", Validators.required),
      "phone": new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ]
        ),
      "agreement": new FormControl("", Validators.requiredTrue)
    })
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

    const address: string = this.registerForm.get('street').value + this.registerForm.get('city').value;
    const newAccount: Account = new Account(
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('name').value,
      address,
      this.registerForm.get('phone').value
    );
    this.registerService.register(newAccount).subscribe((data) => {
      this.router.navigate(['/login']);
    }, errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    });
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
