import {Injectable} from "@angular/core";
import {CartItem} from "./cart-item/cart-item.model";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CartService {
  cartItems: CartItem[] = [];
  cartItemsChanged = new BehaviorSubject<CartItem[]>(this.cartItems.slice());

  // take cart out of local storage when user login
  fetchCart(username: string) {
    this.cartItems = JSON.parse(localStorage.getItem(username));
    if (this.cartItems) {
      this.cartItemsChanged.next(this.cartItems.slice());
    } else {
      this.cartItems = [];
    }
  }

  addCartItem(cartItem: CartItem) {
    if (!this.getCartItem(cartItem.name, cartItem.color, cartItem.size)) {
      this.cartItems.push(cartItem);
      this.saveCart();
      this.cartItemsChanged.next(this.cartItems.slice());
    }
  }

  getCartItemById(id: number) {
    for (let cartItem of this.cartItems) {
      if (cartItem.id === id) {
        return cartItem;
      }
    }
    return null;
  }

  getCartItem(name: string, colorName: string, size: string) {
    for (let cartItem of this.cartItems) {
      if (cartItem.name === name && cartItem.color === colorName && cartItem.size === size) {
        return cartItem;
      }
    }
    return null;
  }

  createCart(username: string) {
    const emptyCart: CartItem[] = [];
    localStorage.setItem(username, JSON.stringify(emptyCart));
  }

  updateCartItemQuantity(item: CartItem) {
    const updateIndex = this.cartItems.indexOf(this.getCartItemById(item.id));
    this.cartItems[updateIndex] = item;
    this.saveCart();
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  deleteCartItem(id: number) {
    const deletedCartItem = this.getCartItemById(id);
    const deletedIndex = this.cartItems.indexOf(deletedCartItem);
    this.cartItems.splice(deletedIndex, 1);
    this.saveCart();
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  saveCart() {
    localStorage.setItem(sessionStorage.getItem('username'), JSON.stringify(this.cartItems));
  }

  clearCart(username: string) {
    localStorage.removeItem(username);
  }
}
