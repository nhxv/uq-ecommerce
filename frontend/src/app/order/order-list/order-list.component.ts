import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountOrder} from "../account-order.model";
import {Subscription} from "rxjs";
import {OrderApiService} from "../../api/order-api.service";
import {OrderService} from "../order.service";
import {AccountService} from "../../account/account.service";
import {Account} from "../../account/account.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: AccountOrder[];
  isAnyOrder: boolean = true;
  ordersSub: Subscription;
  account: Account;
  accountSub: Subscription;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 4;
  totalElements: number = 0;

  constructor(private orderApiService: OrderApiService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.listOrders();
    this.ordersSub = this.orderService.updateStatusChanged.subscribe(() => {
      this.listOrders();
    });
  }

  listOrders() {
    this.orderApiService.getOrdersByAccountEmail(this.pageNumber - 1, this.pageSize, sessionStorage.getItem('username')).subscribe(this.processCustomPageable());
  }

  processCustomPageable() {
    return data => {
      this.orders = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      this.isAnyOrder = this.orders.length !== 0;
    };
  }

  setOrderColor(status: string) {
    switch (status) {
      case "PROCESSING":
        return "bg-warning";
      case "DELIVERED":
        return "bg-success";
      case "RETURN":
        return "bg-danger";
    }
  }

  customDate(date: string): string {
    return date.slice(0, date.indexOf("T"));
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
