import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountOrder} from "../account-order.model";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";
import {OrderApiService} from "../../api/order-api.service";
import {AuthService} from "../../auth/auth.service";
import {AccountApiService} from "../../api/account-api.service";
import {Account} from "../../account/account.model";
import {AccountService} from "../../account/account.service";
import {AccountStatService} from "../../account/account-stat.service";
import {OrderStatService} from "../order-stat.service";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit, OnDestroy {
  orders: AccountOrder[];
  isAnyOrder: boolean = true;
  ordersSub: Subscription;
  statusSelected: string = '';
  staff: Account;
  stats: number[];
  statSub: Subscription;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private orderService: OrderService,
              private orderApiService: OrderApiService,
              private orderStatService: OrderStatService,
              private authService: AuthService,
              private accountStatService: AccountStatService) {}

  ngOnInit(): void {
    if (this.orderStatService.getStats().length !== 0) {
      this.stats = this.orderStatService.getStats();
    } else {
      this.orderStatService.fetchStats();
    }
    this.statSub = this.orderStatService.statsChanged.subscribe((data) => {
      this.stats = data;
    });
    this.listOrders();
    this.ordersSub = this.orderService.updateStatusChanged.subscribe(() => {
      this.listOrders();
    });
  }

  listOrders() {
    this.orderApiService.getAllOrders(this.pageNumber - 1, this.pageSize).subscribe(this.processCustomPageable());
  }

  processCustomPageable() {
    return data => {
      this.orders = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      if (this.orders.length === 0) {
        this.isAnyOrder = false;
      } else {
        this.isAnyOrder = true;
      }
    };
  }

  customDate(date: string): string {
    return date.slice(0, date.indexOf("T"));
  }

  onSetStatus(id: number, status: string, currentOrder: AccountOrder) {
    this.statusSelected = status;
    let statusUpdate: string = currentOrder.status;
    switch(status) {
      case "Hoàn thành":
        if (statusUpdate === 'DELIVERED') {
          console.log('no change');
          return;
        }
        statusUpdate = 'DELIVERED';
        break;
      case "Đang xử lí":
        if (statusUpdate === 'PROCESSING') {
          return;
        }
        statusUpdate = 'PROCESSING';
        break;
      case "Hoàn trả":
        if (statusUpdate === 'RETURN') {
          return;
        }
        statusUpdate = 'RETURN';
        break;
    }
    this.orderApiService.updateByStaff(id, sessionStorage.getItem('username'), statusUpdate).subscribe(() => {
      this.orderService.setUpdateStatus();
      if (statusUpdate === 'DELIVERED') {
        this.orderStatService.whenDelivered(currentOrder.status);
      } else if (statusUpdate === 'RETURN') {
        this.orderStatService.whenReturn(currentOrder.status);
      } else {
        this.orderStatService.whenOnGoing(currentOrder.status);
      }
      this.accountStatService.whenStaffWork();
    });
  }

  isStaff() {
    return this.authService.isStaff();
  }

  displayOrderStatus(status: string): string {
    switch(status) {
      case 'DELIVERED':
        return 'Hoàn thành';
      case 'PROCESSING':
        return 'Đang xử lí';
      case 'RETURN':
        return 'Hoàn trả';
    }
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.statSub.unsubscribe();
  }

}
