import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ImageApiService {
  private baseUrl = "http://localhost:8080/images";

  constructor(private http: HttpClient) {}

  uploadImages(imageData: FormData, productId: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${productId}`, imageData, {observe: "response"});
  }

  getImages(productId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }
}
