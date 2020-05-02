import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {Account} from "../account.model";
import {Role} from "../role.model";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  customers: Account[];
  customersSub: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.customersSub = this.accountService.accountsChanged.subscribe((accountsData: Account[]) => {
      this.customers = accountsData.filter((account: Account) => account.roles.length === 1 && account.roles[0].name === 'CUSTOMER');
    });
  }

  addStaffRole(account: Account) {
    this.accountService.updateRole(account.id, account);
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }
}
