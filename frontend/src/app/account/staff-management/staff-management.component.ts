import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../account.service";
import {Account} from "../account.model";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit, OnDestroy {
  staffs: Account[];
  staffsSub: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.staffsSub = this.accountService.accountsChanged.subscribe((accountsData: Account[]) => {
      this.staffs = accountsData.filter((account: Account) => account.roles.length > 1);
    });
  }

  removeStaffRole(account: Account) {
    this.accountService.updateRole(account.id, account);
  }

  ngOnDestroy(): void {
    this.staffsSub.unsubscribe();
  }

}
