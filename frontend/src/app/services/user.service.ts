import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Router } from '@angular/router';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  returnUrl = '';
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin):Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to TubeTalk ${user.name}!`,
          'Login Successful')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to TubeTalk ${user.name}!`,
          'Register Successful')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    )
  }

  getUserName(): string {
    const user = this.getUserFromLocalStorage();
    return user ? user.name : '';
  }

  getUserEmail(): string {
    const user = this.getUserFromLocalStorage();
    return user ? user.email : '';
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    // window.location.reload();
    this.router.navigateByUrl(this.returnUrl);
  }

  private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User {
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
