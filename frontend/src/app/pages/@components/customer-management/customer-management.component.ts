import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../../../@services/account.service";
import {Account} from "../../../@models/account.model";
import {Role} from "../../../@models/role.model";
import {AccountApiService} from "../../../api/account-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerEditComponent} from "./customer-edit/customer-edit.component";
import {AccountStatService} from "../../../@services/account-stat.service";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  customers: Account[];
  customersSub: Subscription;
  isAnyCustomer: boolean = true;
  @Input() customer: Account;
  stats: number[];
  statSub: Subscription;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private accountService: AccountService,
              private accountApiService: AccountApiService,
              private accountStatService: AccountStatService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.accountStatService.getStats().length !== 0) {
      this.stats = this.accountStatService.getStats();
    } else {
      this.accountStatService.fetchStats();
    }
    this.statSub = this.accountStatService.accountStatsChanged.subscribe((data) => {
      this.stats = data;
    });
    this.listCustomers();
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

  addStaffRole(customer: Account) {
    const modalRef = this.modalService.open(CustomerEditComponent);
    modalRef.componentInstance.customer = customer;
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }
}
