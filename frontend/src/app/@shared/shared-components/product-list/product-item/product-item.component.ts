import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../@models/product.model";
import {ImageApiService} from "../../../../api/image-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productInput: Product;
  @Input() id: number;
  imageUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.imageUrl = this.productInput.images[0].imagePath;
  }

  onNavigate() {
    console.log(`navigate to ` + `products/${this.id}`);
    this.router.navigate([`products/${this.id}`]);
  }
}
