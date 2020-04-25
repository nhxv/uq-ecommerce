import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {Category} from "../../category/category.model";
import {CategoryService} from "../../category/category.service";
import {Product} from "../product.model";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  productForm: FormGroup;
  errorMessage: string = '';
  categoryList: Category[] = [];
  categorySelected: Category = null;
  images: File[] = [];
  imageNames: string[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryList();
    this.categoryService.categoriesChanged.subscribe((categories: Category[]) => {
      this.categoryList = categories;
      this.initForm();
    });
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      "name": new FormControl('', Validators.required),
      "description": new FormControl(''),
      "category": new FormControl(this.categoryList[0]),
      "colors": this.formBuilder.array([this.formBuilder.group({
        "name": '',
      })]),
      "sizes": this.formBuilder.array([this.formBuilder.group({
        "size": ''
      })]),
      "unitPrice": new FormControl(''),
      "images": new FormControl('')
    });
  }

  onAddProduct() {
    // create product, update category with product, set images product_id to product just created
    const imageData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      imageData.append("imageFile", this.images[i], this.images[i].name);
    }
    const product: Product = new Product(
      this.productForm.get('name').value,
      this.productForm.get('description').value,
      this.productForm.get('category').value,
      this.productForm.get('colors').value,
      this.productForm.get('sizes').value,
      null,
      this.productForm.get('unitPrice').value
      );
    this.productService.createProduct(product, imageData);
  }

  onSetCategory(category: Category) {
    this.categorySelected = category;
  }

  get colors() {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  addColor() {
    this.colors.push(this.formBuilder.group({
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

  isInvalidField(field: string) {}

}
