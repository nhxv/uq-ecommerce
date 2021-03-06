import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../@models/product.model";

@Injectable({providedIn: 'root'})
export class ProductApiService {
  private baseUrl: string = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllProducts(page: number, size: number): Observable<CustomPageable> {
    return this.http.get<CustomPageable>(`${this.baseUrl}/pageable?page=${page}&size=${size}`);
  }

  getProductsByCategory(page: number, size: number, categoryId: number): Observable<CustomPageable> {
    return this.http.get<CustomPageable>(`${this.baseUrl}/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`);
  }

  searchProductsByName(page: number, size: number, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByNameContaining?name=${name}&page=${page}&size=${size}`);
  }

  getProductStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  createByStaff(staffEmail: string, product: Product) {
    return this.http.post(`${this.baseUrl}/by-staff?staffEmail=${staffEmail}`, product);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}

interface CustomPageable {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
