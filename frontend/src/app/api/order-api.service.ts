import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountOrder} from "../@models/account-order.model";
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

  getOrderPdf(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/print/${id}`, {responseType: 'arraybuffer'});
  }

  getOrderStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  addOrder(accountOrder: AccountOrder): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, accountOrder);
  }

  updateByStaff(orderId: number, staffEmail: string, status: String): Observable<Object> {
    return this.http.put(`${this.baseUrl}/by-staff?orderId=${orderId}&staffEmail=${staffEmail}`, status);
  }
}
