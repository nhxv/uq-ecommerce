import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(private router: Router, private loginService: LoginService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required)
    })
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.errorMessage = "Đăng nhập không hợp lệ";
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }
    const loginPayload = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.loginService.login(loginPayload).subscribe((data:any) => {
      // success login
      localStorage.setItem('token', data.result.token);
      sessionStorage.setItem('username', loginPayload.email);
      sessionStorage.setItem('role', data.result.roles[0].name);
      // fetch user cart if user has one, otherwise create new cart
      if (localStorage.getItem(loginPayload.email)) {
        this.cartService.fetchCart(loginPayload.email);
      } else {
        this.cartService.createCart(loginPayload.email);
      }
      // navigate to home page if success
      this.router.navigate(['/home']);
    }, errorMessage => {
      if (!this.loginForm.valid) {
        this.errorMessage = 'Please fill in all required fields.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      } else {
        this.errorMessage = errorMessage;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    });
  }

  isInvalidField(field: string): boolean {
    if (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) {
      return true;
    }
    return false;
  }

}
