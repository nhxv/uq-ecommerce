import {Injectable} from "@angular/core";
import {ProductApiService} from "../api/product-api.service";
import {Product} from "./product.model";
import {BehaviorSubject} from "rxjs";
import {ImageApiService} from "../api/image-api.service";

@Injectable({providedIn: 'root'})
export class ProductService {
  products: Product[] = [];
  productsChanged = new BehaviorSubject<Product[]>(this.products.slice());
  product: Product = null;
  productChanged = new BehaviorSubject({...this.product});
  updateStatus: boolean = false;
  updateStatusChanged = new BehaviorSubject(this.updateStatus);

  constructor(private productApiService: ProductApiService, private imageApiService: ImageApiService) {}

  fetchProductList() {
    this.productApiService.getProductList().subscribe((data: Product[]) => {
      this.products = data;
      this.productsChanged.next(this.products.slice());
    })
  }

  getProducts() {
    return this.products.slice();
  }

  createProduct(product: Product, imageData: FormData) {
    this.productApiService.createProduct(product).subscribe((productData: Product) => {
      this.imageApiService.uploadImages(imageData, productData.id).subscribe(() => {
        this.setUpdateStatus();
      })
    });
  }

  updateProduct(id: number, product : Product) {
    this.productApiService.updateProduct(id, product).subscribe((productData: Product) => {
      this.setProduct(productData);
    });
  }

  getProduct(id: number) {
    for (let product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
  }

  fetchProductById(id: number) {
    this.productApiService.getProduct(id).subscribe((productData: Product) => {
      this.setProduct(productData);
    });
  }

  setProduct(productData: Product) {
    this.product=  productData;
    this.productChanged.next({...this.product});
  }

  setUpdateStatus() {
    this.updateStatus = true;
    this.updateStatusChanged.next(this.updateStatus);
  }

  deleteProduct(id: number) {
    this.productApiService.deleteProduct(id).subscribe(() => {
      const deletedIndex = this.products.indexOf(this.getProduct(id));
      this.products.splice(deletedIndex, 1);
      this.productsChanged.next(this.products.slice());
    });
  }
}
