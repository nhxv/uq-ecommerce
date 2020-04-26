import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductFormComponent} from "./product-form/product-form.component";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }
  ngOnInit(): void {
  }

  onAdd() {
    const modalRef =this.modalService.open(ProductFormComponent);
  }
}
