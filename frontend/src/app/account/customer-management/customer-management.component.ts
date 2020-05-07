import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {Account} from "../account.model";
import {Role} from "../role.model";
import {AccountApiService} from "../../api/account-api.service";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  customers: Account[];
  customersSub: Subscription;
  isAnyCustomer: boolean = true;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private accountService: AccountService, private accountApiService: AccountApiService) {}

  ngOnInit(): void {
    this.customersSub = this.accountService.updateStatusChanged.subscribe(() => {
      this.listCustomers();
    });
  }

  listCustomers() {
    this.accountApiService.getAccountsByRole(this.pageNumber - 1, this.pageSize, 'CUSTOMER').subscribe(this.processCustomPageable());
  }

  processCustomPageable() {
    return data => {
      this.customers = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      if (this.customers.length === 0) {
        this.isAnyCustomer = false;
      } else {
        this.isAnyCustomer = true;
      }
    };
  }

  addStaffRole(account: Account) {
    this.accountService.updateRole(account.id, account);
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }
}
