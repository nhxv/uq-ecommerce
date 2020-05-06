import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class StaffGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isStaff() || this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
