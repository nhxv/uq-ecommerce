import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../product/product.model";

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

  getProductList(): Observable<Object> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProductsByCategory(page: number, size: number, categoryId: number): Observable<CustomPageable> {
    return this.http.get<CustomPageable>(`${this.baseUrl}/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`);
  }

  searchProductsByName(page: number, size: number, name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByNameContaining?name=${name}&page=${page}&size=${size}`);
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
}

interface CustomPageable {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface JpaPageable {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
