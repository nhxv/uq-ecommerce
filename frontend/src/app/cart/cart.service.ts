import {Injectable} from "@angular/core";
import {CartItem} from "./cart-item/cart-item.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../product/product.model";
import {ProductApiService} from "../api/product-api.service";
import {forkJoin} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CartService {
  cartItems: CartItem[] = [];
  cartItemsChanged = new BehaviorSubject<CartItem[]>(this.cartItems.slice());
  cartError: boolean = false;

  constructor(private productApiService: ProductApiService) {}

  // take cart out of local storage when user login
  fetchCart(username: string) {
    this.cartItems = JSON.parse(localStorage.getItem(username));
    let observables: Observable<any>[] = [];
    if (this.cartItems.length !== 0) {
      // check with database to update cart item name & price
      for (let cartItem of this.cartItems) {
        observables.push(this.productApiService.getProduct(cartItem.id));
      }
      forkJoin(observables).subscribe((productsData: Product[]) => {
        for (let i = 0; i < this.cartItems.length; i++) {
          if (productsData[i].name !== this.cartItems[i].name || productsData[i].unitPrice !== this.cartItems[i].unitPrice || productsData[i].available !== this.cartItems[i].available) {
            this.updateCartItemInfo(productsData[i]);
          }
          this.saveCart();
          this.cartItemsChanged.next(this.cartItems.slice());
        }
      });
    } else {
      this.cartItems = [];
      this.cartItemsChanged.next(this.cartItems.slice());
    }
  }

  addCartItem(cartItem: CartItem) {
    // khi item không có trong giỏ và giỏ không có quá 10 món hàng
    if (!this.getCartItem(cartItem.name, cartItem.color, cartItem.size) && this.cartItems.length < 10) {
      this.cartError = false;
      this.cartItems.push(cartItem);
      this.saveCart();
      this.cartItemsChanged.next(this.cartItems.slice());
    } else {
      this.cartError = true;
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
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  updateCartItemInfo(product: Product) {
    console.log('update cart item');
    console.log(product);
    if (this.cartItems) {
      const updateIndex = this.cartItems.indexOf(this.getCartItemById(product.id));
      this.cartItems[updateIndex].name = product.name;
      this.cartItems[updateIndex].unitPrice = product.unitPrice;
      this.cartItems[updateIndex].available = product.available;
      this.saveCart();
      this.cartItemsChanged.next(this.cartItems.slice());
    }
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

  clearCart() {
    this.cartItems = [];
    this.saveCart();
    this.cartItemsChanged.next(this.cartItems);
  }
}
