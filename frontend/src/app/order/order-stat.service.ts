import {Injectable} from "@angular/core";
import {OrderApiService} from "../api/order-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class OrderStatService {
  //0: số đơn hàng, 1: số đơn chuyển thành công, 2: đơn hoàn trả
  stats: number[] = [];
  statsChanged = new BehaviorSubject(this.stats.slice());

  constructor(private orderApiService: OrderApiService) {}

  fetchStats() {
    this.orderApiService.getOrderStats().subscribe((data: number[]) => {
      this.stats = data;
      this.statsChanged.next(this.stats.slice());
    });
  }

  getStats() {
    return this.stats.slice();
  }

  whenOrder() {
    if (this.stats.length !== 0) {
      this.stats[0] += 1;
      this.statsChanged.next(this.stats.slice());
    }
  }

  whenDelivered(currentStatus: string) {
    if (this.stats.length !== 0) {
      if (currentStatus === 'RETURN') {
        this.stats[2] -= 1;
      }
      this.stats[1] += 1;
      this.statsChanged.next(this.stats.slice());
    }
  }

  whenReturn(currentStatus: string) {
    if (this.stats.length !== 0) {
      if (currentStatus === 'DELIVERED') {
        this.stats[1] -= 1;
      }
      this.stats[2] += 1;
      this.statsChanged.next(this.stats.slice());
    }
  }

  whenOnGoing(currentStatus: string) {
    if (this.stats.length !== 0) {
      if (currentStatus === 'DELIVERED') {
        this.stats[1] -= 1;
        this.statsChanged.next(this.stats.slice());
      } else if (currentStatus === 'RETURN') {
        this.stats[2] -= 1;
        this.statsChanged.next(this.stats.slice());
      }
    }
  }
}
