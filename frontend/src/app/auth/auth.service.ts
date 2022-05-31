import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private router: Router) { }

  isUser(): boolean {
    const user = sessionStorage.getItem('username');
    return !!user;
  }

  isStaff(): boolean {
    if (this.isUser()) {
      return sessionStorage.getItem('role') === 'STAFF';
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.isUser()) {
      return sessionStorage.getItem('role') === 'ADMIN';
    }
    return false;
  }

  logOut(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/home']);
  }
}
