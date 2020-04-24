import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class CategoryApiService {
  private baseUrl: string = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  getCategory(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
