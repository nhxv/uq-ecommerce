import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {CartItem} from "./cart-item.model";
import {ImageApiService} from "../../api/image-api.service";
import {Image} from "../../product/image.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;
  imageUrl: string;
  price: number;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private cartService: CartService, private imageApiService: ImageApiService) {}

  ngOnInit(): void {
    this.price = this.item.unitPrice * this.item.quantity;
    this.imageApiService.getImages(this.item.id).subscribe(
    (imagesData: Image[]) => {
      if (imagesData.length !== 0) {
        this.imageUrl = 'data:image/jpeg;base64,' + imagesData[0].picByte;
      }
    });
  }

  onDeleteItem() {
    this.cartService.deleteCartItem(this.item.id);
  }
}
