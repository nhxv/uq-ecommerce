import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../product.model";
import {ImageApiService} from "../../../api/image-api.service";
import {Image} from "../../image.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productInput: Product;
  @Input() id: number;
  imageUrl: string = '';

  constructor(private imageApiService: ImageApiService) {}

  ngOnInit(): void {
    this.imageApiService.getImages(this.id).subscribe((imagesData: Image[]) => {
      this.imageUrl = 'data:image/jpeg;base64,' + imagesData[0].picByte;
    });
  }

}
