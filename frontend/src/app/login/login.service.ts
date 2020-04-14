import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginPayload): Observable<Object> {
    console.log(loginPayload);
    return this.http.post<Object>('http://localhost:8080/' + 'login', loginPayload).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    // network fail -- cannot access errorResponse
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.status) {
      case 401:
        errorMessage = 'This account doesn\'t exist';
        break;
    }
    return throwError(errorMessage);
  }
}
