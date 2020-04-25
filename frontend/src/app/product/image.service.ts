import {Injectable} from "@angular/core";
import {ImageApiService} from "../api/image-api.service";
import {ProductService} from "./product.service";

@Injectable({providedIn: 'root'})
export class ImageService {

  constructor(private imageApiService: ImageApiService, private productService: ProductService) {}

  uploadImages(imageData, productId: number) {
    this.imageApiService.uploadImages(imageData, productId).subscribe(() => {
      this.productService.getProductList();
    });
  }

  getImageByName(imageName: string) {}
}
