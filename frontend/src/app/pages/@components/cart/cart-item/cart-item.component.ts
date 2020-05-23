import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../../../@services/cart.service";
import {CartItem} from "../../../../@models/cart-item.model";
import {ImageApiService} from "../../../../api/image-api.service";
import {Image} from "../../../../@models/image.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;
  imageUrl: string;
  price: number;
  quantities: number[] = [1, 2, 3, 4, 5];
  quantitySelected: number = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.imageUrl = this.item.imageUrl;
    this.price = this.item.unitPrice * this.item.quantity;
    this.quantitySelected = this.item.quantity;
  }

  onSetQuantity(quantity: number) {
    this.quantitySelected = quantity;
    this.item.quantity = quantity;
    this.price = this.item.unitPrice * this.quantitySelected;
    this.cartService.updateCartItemQuantity(this.item);
  }

  onDeleteItem() {
    this.cartService.deleteCartItem(this.item.id);
  }
}
