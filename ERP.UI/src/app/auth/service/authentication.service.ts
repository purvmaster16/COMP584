import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { CoreApiService } from 'app/core/services/core-api.service';
import { APIURLConstants } from 'app/core/constants/api-url.constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends CoreApiService {
  //public
  public currentUser: Observable<User>;
  private userDetails: any = null;
  private usersKey = 'currentUser';

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    
    super();
    this.AddApiUrl = APIURLConstants.User.RegisterUser;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param username
   * @param password
   * @returns user
   */
  login(username: string, password: string) {
    return this._http
      .post<any>(`${environment.apiBaseUrl}user/auth/login`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data));

            // notify
            this.currentUserSubject.next(user.data);
          }

          return user.data;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }

  private decodeToken(token: string): any {
    // Decode JWT token
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    return JSON.parse(atob(parts[1]));
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);

    return expirationDate;
  }

  isAuthenticated(): boolean {
    const token = this.getUserToken();
    
    if (!token) {
      return false;
    }
    const expirationDate = this.getTokenExpirationDate(token);

    if (expirationDate && expirationDate > new Date()) {
      return true;
    } else {
      this.logout(); 
      return false;
    }
  }

  getUserToken() {
    this.userDetails = this.getUserDet();
    return this.userDetails?.token || "";
  }
  getUserDet(): any {
    return JSON.parse(localStorage.getItem(this.usersKey) || null);
  }
}
