import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {Account} from "../../account.model";
import {AccountApiService} from "../../../api/account-api.service";
import {AccountStatService} from "../../account-stat.service";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  @Input() customer: Account;
  errorMessage: string = '';

  constructor(private activeModal: NgbActiveModal,
              private accountApiService: AccountApiService,
              private accountService: AccountService,
              private accountStatService: AccountStatService) {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      "salary": new FormControl(0, [Validators.required, Validators.min(1000)]),
    });
  }

  onUpdateCustomer() {
    if (!this.customerForm.valid) {
      this.errorMessage = 'Thông tin cập nhật không hợp lệ';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    const accountUpdate: Account = new Account(
      this.customer.email,
      null,
      this.customer.name,
      this.customer.address,
      this.customer.phone,
      this.customer.roles,
      this.customer.cmnd,
      this.customer.age,
      this.customerForm.get('salary').value,
      this.customer.accountOrders
    );
    this.accountApiService.updateRole(this.customer.id, accountUpdate).subscribe((data) => {
      this.accountService.setUpdateStatus();
      this.accountStatService.whenAddStaff();
      this.customerForm.reset();
      this.activeModal.close('Click');
    });
  }

  isInvalidField(field: string) {
    return !this.customerForm.get(field).valid && this.customerForm.get(field).touched;
  }

}
