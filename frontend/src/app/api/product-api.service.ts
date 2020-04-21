import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductApiService {
  private baseUrl: string = 'http://localhost:8080/products';
}
