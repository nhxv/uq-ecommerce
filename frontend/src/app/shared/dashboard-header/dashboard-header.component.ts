import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  isNavbarCollapsed = true;
  isOpen = false;
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
  }

  onMenu() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isOpen = !this.isOpen;
  }

  onSignOut() {
    this.authService.logOut();
  }
}
