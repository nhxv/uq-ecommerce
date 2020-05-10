import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountOrder} from "../order/account-order.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class OrderApiService {
  private baseUrl = 'http://localhost:8080/account-orders';

  constructor(private http: HttpClient) {}

  addOrder(accountOrder: AccountOrder): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, accountOrder);
  }
}
