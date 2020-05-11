import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountOrder} from "../order/account-order.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class OrderApiService {
  private baseUrl = 'http://localhost:8080/account-orders';

  constructor(private http: HttpClient) {}

  getAllOrders(page: number, size: number) {
    return this.http.get(`${this.baseUrl}/pageable?page=${page}&size=${size}`);
  }

  getOrdersByAccountEmail(page: number, size: number, email: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/search/findByEmail?page=${page}&size=${size}&email=${email}`);
  }

  addOrder(accountOrder: AccountOrder): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, accountOrder);
  }

  updateOrder(id: number, status: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, status);
  }
}
