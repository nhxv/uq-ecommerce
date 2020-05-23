import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AccountService} from "../../../@services/account.service";
import {Account} from "../../../@models/account.model";
import {AccountApiService} from "../../../api/account-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StaffEditComponent} from "./staff-edit/staff-edit.component";
import {AccountStatService} from "../../../@services/account-stat.service";

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit, OnDestroy {
  staffs: Account[];
  staffsSub: Subscription;
  isAnyStaff: boolean = true;
  @Input() staff: Account;
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
    this.listStaffs();
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

  editStaffSalary(staff: Account) {
    const modalRef = this.modalService.open(StaffEditComponent);
    modalRef.componentInstance.staff = staff;
  }


  removeStaffRole(account: Account) {
    let isConfirm: boolean = confirm('Bạn chắc chắn muốn xoá nhân viên này không?');
    if (!isConfirm) {
      return;
    }
    let accountUpdate: Account = account;
    accountUpdate.salary = 0;
    this.accountStatService.whenStaffRemove(accountUpdate.orderWork + accountUpdate.productWork);
    this.accountService.updateRole(account.id, accountUpdate);
  }

  ngOnDestroy(): void {
    this.staffsSub.unsubscribe();
    this.statSub.unsubscribe();
  }

}
