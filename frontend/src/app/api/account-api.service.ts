import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AccountApiService {
  private baseUrl = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) {}

  getAccount(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAccountByEmail(email: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/profile/${email}`);
  }

  getAccountList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAccountsByRole(page: number, size: number, roleName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchRole?role=${roleName}&page=${page}&size=${size}`);
  }

  createAccount(user: Object): Observable<Object> {
    return this.http.post('http://localhost:8080/register', user);
  }

  updateAccount(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateRole(id: number, account: Account): Observable<any> {
    return this.http.put(`${this.baseUrl}/role/${id}`, account);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
}
