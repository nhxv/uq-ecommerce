import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountOrder} from "../account-order.model";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";
import {OrderApiService} from "../../api/order-api.service";

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

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private orderService: OrderService,
              private orderApiService: OrderApiService) {}

  ngOnInit(): void {
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

  onSetStatus(id: number, status: string) {
    this.statusSelected = status;
    let statusUpdate: string = '';
    switch(status) {
      case "Hoàn thành":
        statusUpdate = 'DELIVERED';
        break;
      case "Đang xử lí":
        statusUpdate = 'PROCESSING';
        break;
      case "Hoàn trả":
        statusUpdate = 'RETURN';
        break;
    }
    this.orderApiService.updateOrder(id, statusUpdate).subscribe(() => {
      this.orderService.setUpdateStatus();
    })
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
