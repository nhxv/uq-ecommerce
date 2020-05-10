import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {CartItem} from "./cart-item/cart-item.model";
import {CartService} from "./cart.service";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class CartResolverService implements Resolve<CartItem[]> {
  constructor(private cartService: CartService, private authService: AuthService) {}

  // resolve will auto subscribe to know when the data get there
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CartItem[]> | Promise<CartItem[]> | CartItem[] | any {
    if (this.authService.isUser()) {
      return this.cartService.fetchCart(sessionStorage.getItem('username'));
    } else {
      return null;
    }
  }
}
