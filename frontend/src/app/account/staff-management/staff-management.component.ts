import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {Account} from "../account.model";
import {AccountApiService} from "../../api/account-api.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit, OnDestroy {
  staffs: Account[];
  staffsSub: Subscription;
  isAnyStaff: boolean = true;

  // properties for pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  constructor(private accountService: AccountService, private accountApiService: AccountApiService) {}

  ngOnInit(): void {
    this.staffsSub = this.accountService.updateStatusChanged.subscribe(() => {
      this.listStaffs();
    });
  }

  listStaffs() {
    this.accountApiService.getAccountsByRole(this.pageNumber - 1, this.pageSize, 'STAFF').subscribe(this.processCustomPageable());
  }

  processCustomPageable() {
    return data => {
      this.staffs = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      if (this.staffs.length === 0) {
        this.isAnyStaff = false;
      } else {
        this.isAnyStaff = true;
      }
    };
  }


  removeStaffRole(account: Account) {
    this.accountService.updateRole(account.id, account);
  }

  ngOnDestroy(): void {
    this.staffsSub.unsubscribe();
  }

}
