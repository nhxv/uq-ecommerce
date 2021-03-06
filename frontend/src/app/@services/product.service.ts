import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService {
  updateStatus: boolean = false;
  updateStatusChanged = new BehaviorSubject(this.updateStatus);

  setUpdateStatus() {
    this.updateStatus = true;
    this.updateStatusChanged.next(this.updateStatus);
  }
}
