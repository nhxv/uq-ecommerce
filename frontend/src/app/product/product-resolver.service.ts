import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  // resolve will auto subscribe to know when the data get there
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] | any {
    const products = this.productService.getProducts();
    if (products.length === 0) {
      // if we don't have any current products, fetch them from the server
      return this.productService.fetchProductList();
    } else {
      return products;
    }
  }
}
