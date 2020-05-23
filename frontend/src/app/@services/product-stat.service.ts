import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ProductApiService} from "../api/product-api.service";

@Injectable({providedIn: 'root'})
export class ProductStatService {
  // 0: số sản phẩm, 1: số hàng bày bán
  stats: number[] = [];
  statsChanged = new BehaviorSubject(this.stats.slice());

  constructor(private productApiService: ProductApiService) {}

  fetchStats() {
    this.productApiService.getProductStats().subscribe((data: number[]) => {
      this.stats = data;
      this.statsChanged.next(this.stats.slice());
    })
  }

  getStats(): number[] {
    return this.stats.slice();
  }

  whenAddProduct() {
    if (this.stats.length !== 0) {
      this.stats[0] += 1;
      this.stats[1] += 1;
      this.statsChanged.next(this.stats.slice());
    }
  }

  whenChangeProductStatus(isAvailable: boolean) {
    if (this.stats.length !== 0) {
      if (isAvailable) {
        // enable product
        this.stats[1] += 1;
      } else {
        // enable product
        this.stats[1] -= 1;
      }
      this.statsChanged.next(this.stats.slice());
    }
  }
}
