import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {BehaviorSubject} from "rxjs";
import {UserApiService} from "../api/user-api.service";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class UserService {
  users: User[] = [];
  usersChanged = new BehaviorSubject<User[]>(this.users.slice());
  user: User = null;
  userChanged = new BehaviorSubject({...this.user});

  constructor(private userApiService: UserApiService, private authService: AuthService) {}

  getUserList() {
    this.userApiService.getUserList().subscribe((userData: User[]) => {
      this.users = userData;
      this.usersChanged.next(this.users.slice());
    });
  }

  getUser(email: string) {
    this.userApiService.getUserByEmail(email).subscribe((userData: User) => {
      this.setUser(userData);
    });
  }

  setUser(user: User) {
    this.user = user;
    this.userChanged.next({...this.user});
  }

  createUser(user: User) {
    this.userApiService.createUser(user).subscribe(data => {
      console.log(data);
    });
  }

  updateUser(id: number, userUpdate: User) {
    this.userApiService.updateUser(id, userUpdate);
  }

  deleteUser(id: number) {
    this.userApiService.deleteUser(id);
  }
}
