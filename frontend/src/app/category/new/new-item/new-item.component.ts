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

  ngOnInit(): void {}

  getPath(): string {
    let path = this.productInput.images[0].imagePath.slice(53);
    path = "../../../../" + path.split("\\").join("/");
    return path;
  }

}
