import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AccountApiService} from "../api/account-api.service";

@Injectable({providedIn: 'root'})
export class AccountStatService {
  // 0: số nhân viên; 1: số khách hàng; 2: số việc nhân viên đã làm; 3: số khách mua hàng
  accountStats: number[] = [];
  accountStatsChanged = new BehaviorSubject(this.accountStats.slice());

  constructor(private accountApiService: AccountApiService) {}

  fetchStats() {
    this.accountApiService.getAccountsStat().subscribe((data: number[]) => {
      this.accountStats = data;
      this.accountStatsChanged.next(this.accountStats.slice());
    });
  }

  getStats() {
    return this.accountStats.slice();
  }

  whenAddStaff() {
    if (this.accountStats.length !== 0) {
      this.accountStats[0] += 1;
      // add staff remove customer
      this.accountStats[1] -= 1;
      this.accountStatsChanged.next(this.accountStats.slice());
    }
  }

  whenRegisterCustomer() {
    if (this.accountStats.length !== 0) {
      this.accountStats[1] += 1;
      this.accountStatsChanged.next(this.accountStats.slice());
    }
  }

  whenStaffWork() {
    if (this.accountStats.length !== 0) {
      this.accountStats[2] += 1;
      this.accountStatsChanged.next(this.accountStats.slice());
    }
  }

  whenStaffRemove(workCount: number) {
    if (this.accountStats.length !== 0) {
      this.accountStats[0] -= 1;
      this.accountStats[2] -= workCount;
      this.accountStatsChanged.next(this.accountStats.slice());
    }
  }

  whenCustomerOrder() {
    if (this.accountStats.length !== 0) {
      this.accountStats[3] += 1;
      this.accountStatsChanged.next(this.accountStats.slice());
    }
  }
}
