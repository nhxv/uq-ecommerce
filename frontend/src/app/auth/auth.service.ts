import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() { }

  isUser(): boolean {
    let user = sessionStorage.getItem('username');
    if (!user) {
      return false;
    }
    return true;
  }

  isStaff(): boolean {
    if (this.isUser()) {
      if (sessionStorage.getItem('role') === 'STAFF') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.isUser()) {
      if (sessionStorage.getItem('role') === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  logOut(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    localStorage.removeItem('token');
  }
}
