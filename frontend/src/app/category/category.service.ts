import {Injectable} from "@angular/core";
import {CategoryApiService} from "../api/category-api.service";
import {Category} from "./category.model";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CategoryService {
  categories: Category[] = [];
  categoriesChanged = new BehaviorSubject<Category[]>(this.categories.slice());

  constructor(private categoryApiService: CategoryApiService) {}

  getCategoryList() {
    this.categoryApiService.getCategoryList().subscribe((categoriesData: Category[]) => {
      this.categories = categoriesData;
      this.categoriesChanged.next(this.categories.slice());
    });
  }
}
