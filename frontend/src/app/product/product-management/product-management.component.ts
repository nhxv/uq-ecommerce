import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  productForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      "name": new FormControl('', Validators.required),
      "description": new FormControl(''),
      "category": new FormControl(''),
      "colors": this.formBuilder.array([this.formBuilder.group({
        "hexcode": '',
        "name": '',
      })]),
      "images": new FormControl(''),
      "unitPrice": new FormControl('')
    })
  }

  get colors() {
    return this.productForm.get('colors') as FormArray;
  }

  addColor() {
    this.colors.push(this.formBuilder.group({
      "hexcode": '',
      "name": ''
    }));
  }

  deleteColor(i) {
    this.colors.removeAt(i);
  }


  onAddProduct() {

  }

  isInvalidField(field: string) {}

}
