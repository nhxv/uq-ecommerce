import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../category/category.model";
import {ProductService} from "../../product.service";
import {CategoryService} from "../../../category/category.service";
import {Product} from "../../product.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductApiService} from "../../../api/product-api.service";
import {Size} from "../../size.model";
import {Color} from "../../color.model";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  errorMessage: string = '';
  categoryList: Category[] = [];
  categorySelected: Category = null;
  images: File[] = [];
  imageNames: string[] = [];
  totalImageSize: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productApiService: ProductApiService,
    private categoryService: CategoryService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.totalImageSize = 0;
    this.categoryService.getCategoryList();
    this.categoryService.categoriesChanged.subscribe((categories: Category[]) => {
      this.categoryList = categories;
      this.initForm();
    });
  }

  private initForm() {
    this.productForm = this.formBuilder.group({
      "name": new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5)
      ]),
      "description": new FormControl('', [
        Validators.required,
        Validators.maxLength(600),
        Validators.minLength(10)
      ]),
      "category": new FormControl(this.categoryList[0]),
      "colors": this.formBuilder.array([this.formBuilder.group({
        "name": ['', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(2)
        ]],
      })]),
      "sizes": this.formBuilder.array([this.formBuilder.group({
        "size": ['', [
          Validators.required,
          Validators.maxLength(3)
        ]],
      })]),
      "unitPrice": new FormControl('', [
        Validators.required,
        Validators.max(10000000),
        Validators.min(1000)
      ]),
      "images": new FormControl('')
    });
  }

  onAddProduct() {
    // validate form
    const sizesInput: Size[] = this.productForm.get('sizes').value;
    const colorsInput: Color[] = this.productForm.get('colors').value;
    if (!this.productForm.valid || this.images.length < 1) {
      this.errorMessage = 'Thông tin sản phẩm không hợp lệ';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }

    // create product, update category with product, set images product_id to product just created
    const imageData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      imageData.append("imageFile", this.images[i], this.images[i].name);
    }

    const sizes: Size[] = sizesInput.map((size: Size) => size = new Size(size.size.toUpperCase()));
    const colors: Color[] = colorsInput.map((color: Color) => color = new Color(color.name.toUpperCase()));

    const product: Product = new Product(
      this.productForm.get('name').value,
      this.productForm.get('description').value,
      this.productForm.get('category').value,
      colors,
      sizes,
      null,
      this.productForm.get('unitPrice').value
    );
    this.productService.createProduct(product, imageData);
    this.productForm.reset();
    this.activeModal.close('Close click');
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
      // file sizes smaller than 20MB = 20971520 bytes and has to be image type
      if (event.target.files[i].size + this.totalImageSize < 20971520 && event.target.files[i].type.includes('image')) {
        this.images.push(event.target.files[i]);
        this.totalImageSize += event.target.files[i].size;
      }
    }
    this.imageNames = this.images.map(image => image.name);
  }

  isInvalidField(field: string): boolean {
    return !this.productForm.get(field).valid && this.productForm.get(field).touched;
  }
}
