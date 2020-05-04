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
    return this.productService.fetchProductList();
  }
}
