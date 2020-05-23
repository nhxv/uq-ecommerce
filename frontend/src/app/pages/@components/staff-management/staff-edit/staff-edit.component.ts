import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../@models/account.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AccountApiService} from "../../../../api/account-api.service";
import {AccountService} from "../../../../@services/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {
  staffForm: FormGroup;
  @Input() staff: Account;
  errorMessage: string = '';

  constructor(private activeModal: NgbActiveModal,
              private accountApiService: AccountApiService,
              private accountService: AccountService) {}

  ngOnInit(): void {
    this.staffForm = new FormGroup({
      "salary": new FormControl(this.staff.salary, [Validators.required, Validators.min(1000)]),
    });
  }

  onUpdateSalary() {
    if (!this.staffForm.valid) {
      this.errorMessage = 'Thông tin cập nhật không hợp lệ';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    const accountUpdate: Account = new Account(
      this.staff.email,
      null,
      this.staff.name,
      this.staff.address,
      this.staff.phone,
      this.staff.roles,
      this.staff.cmnd,
      this.staff.age,
      this.staffForm.get('salary').value
    );
    this.accountApiService.updateAccount(this.staff.id, accountUpdate).subscribe(() => {
      this.accountService.setUpdateStatus();
      this.staffForm.reset();
      this.activeModal.close('Click');
    });
  }

  isInvalidField(field: string) {
    return !this.staffForm.get(field).valid && this.staffForm.get(field).touched;}

}
