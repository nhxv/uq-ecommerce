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
  images: File[] = [];
  imageNames: string[] = [];

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
      "sizes": this.formBuilder.array([this.formBuilder.group({
        "size": ''
      })]),
      "unitPrice": new FormControl(''),
      "images": new FormControl('')
    })
  }

  get colors() {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  addColor() {
    this.colors.push(this.formBuilder.group({
      "hexcode": '',
      "name": ''
    }));
  }

  addSize() {
    this.sizes.push(this.formBuilder.group({
      "size": ''
    }));
  }

  deleteColor(i) {
    this.colors.removeAt(i);
  }

  deleteSize(j) {
    this.sizes.removeAt(j);
  }

  onImageChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i]);
    }
    this.imageNames = this.images.map(image => image.name);
  }


  onAddProduct() {

  }

  isInvalidField(field: string) {}

}
