import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AccountApiService} from "../api/account-api.service";
import {Account} from "../account/account.model";

@Injectable({providedIn: 'root'})
export class RegisterService {
  constructor(private accountApiService: AccountApiService) {}

  register(newAccount: Account): Observable<Object> {
    return this.accountApiService.createAccount(newAccount).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    // network fail -- cannot access errorResponse
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.status) {
      case 409:
        errorMessage = 'Email đã được đăng ký';
        break;
    }
    return throwError(errorMessage);
  }
}
