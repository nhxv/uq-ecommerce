import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UNIQUEShop';

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        if (!localStorage.getItem('token')) {
          this.authService.logOut();
        }
      }
    }, false);
  }

}
