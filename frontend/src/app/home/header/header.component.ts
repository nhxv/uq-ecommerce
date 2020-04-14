import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  isOpen = false;

  constructor(private authService : AuthService) {
  }

  ngOnInit(): void {
  }

  onMenu() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isOpen = !this.isOpen;
  }

  onSignOut() {
    this.authService.logOut();
  }

  isAdminOrStaff(): boolean {
    return this.authService.isAdmin() || this.authService.isStaff();
  }

  isGuest(): boolean {
    return !this.authService.isUser();
  }
}
