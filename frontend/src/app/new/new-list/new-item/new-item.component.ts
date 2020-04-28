import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../product/product.model";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  @Input() productInput: Product;
  @Input() id: number;

  constructor() {}

  ngOnInit(): void {
    console.log("new item" + this.productInput);
  }

  getPath(): string {
    return "../../../../" + this.productInput.images[0].imagePath;
  }

}
