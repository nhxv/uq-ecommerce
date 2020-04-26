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

  constructor(private productApiService: ProductApiService, private imageApiService: ImageApiService) {}

  getProductList() {
    this.productApiService.getProductList().subscribe((productsData: Product[]) => {
      this.products = productsData;
      this.productsChanged.next(this.products.slice());
    })
  }

  createProduct(product: Product, imageData: FormData) {
    this.productApiService.createProduct(product).subscribe((productData: Product) => {
      console.log(productData);
      this.imageApiService.uploadImages(imageData, productData.id).subscribe(() => {
        this.productApiService.getProductList().subscribe((productsData: Product[]) => {
          this.products = productsData;
          this.productsChanged.next(this.products.slice());
        });
      })
    });
  }

  updateProduct(id: number, product : Product) {
    this.productApiService.updateProduct(id, product).subscribe(() => {
      this.productApiService.getProductList().subscribe((productsData: Product[]) => {
        this.products = productsData;
        this.productsChanged.next(this.products.slice());
      })
    })
  }

  private getProduct(id: number) {
    for (let product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
  }

  getProductById(id: number) {
    this.productApiService.getProduct(id).subscribe((productData: Product) => {
      this.setProduct(productData);
    });
  }

  setProduct(productData: Product) {
    this.product=  productData;
    this.productChanged.next({...this.product});
  }

  deleteProduct(id: number) {
    this.productApiService.deleteProduct(id).subscribe(() => {
      const deletedIndex = this.products.indexOf(this.getProduct(id));
      this.products.splice(deletedIndex, 1);
      this.productsChanged.next(this.products.slice());
    });
  }
}
