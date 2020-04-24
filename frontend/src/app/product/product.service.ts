import {Injectable} from "@angular/core";
import {ProductApiService} from "../api/product-api.service";
import {Product} from "./product.model";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService {
  products: Product[] = [];
  productsChanged = new BehaviorSubject<Product[]>(this.products.slice());

  constructor(private productApiService: ProductApiService) {}

  getProductList() {
    this.productApiService.getProductList().subscribe((productsData: Product[]) => {
      this.products = productsData;
      this.productsChanged.next(this.products.slice());
    })
  }

  createProduct(product: Product) {
    this.productApiService.createProduct(product).subscribe((productData: Product) => {
      console.log(productData);
      this.productApiService.getProductList().subscribe((productsData: Product[]) => {
        this.products = productsData;
        this.productsChanged.next(this.products.slice());
      });
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
      if (product.id == id) {
        return product;
      }
    }
  }

  deleteProduct(id: number) {
    this.productApiService.deleteProduct(id).subscribe(() => {
      const deletedIndex = this.products.indexOf(this.getProduct(id));
      this.products.splice(deletedIndex, 1);
      this.productsChanged.next(this.products.slice());
    });
  }
}
