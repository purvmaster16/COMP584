import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "environments/environment";
import { AuthenticationService } from "app/auth/service";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  token: string;
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService , private router: Router,private toastr: ToastrService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.blockUI.start("Loading...");
    // const currentUser = this._authenticationService.currentUserValue;
    // this.token = currentUser?.token;
    this.token = this._authenticationService.getUserToken();
    const isAuthenticated = this._authenticationService.isAuthenticated();
    let customizeEq: HttpRequest<any> = null;
    if (this.token && isAuthenticated) {
      customizeEq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.token),
      });
    } else {
      customizeEq = req.clone();
    }
    return next
      .handle(customizeEq)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.blockUI.stop();
            if (event.status === 401) {
              this._authenticationService.logout();
              if (this.router.url !== '/auth/login') {
                this.router.navigateByUrl('/auth/login');
              }
            } else {
              if (event.body?.message) {
                if (event.body.isSuccess) {
                  this.toastr.success(event.body?.message);
                } else {
                  this.toastr.error(event.body?.message);
                }
              }
            }
          }
          return event;
        })
      )
      .pipe(
        catchError((err, caught) => {
          this.blockUI.stop();
          this._authenticationService.logout();
          if ([401].includes(err.status)) {
            if (this.router.url !== '/auth/login') {
              // const error = err.error?.message || err.message || err.statusText;
              // const error = MessageConstants.Unauthorized;
              const error = 'Your authorization has been revoked. Please log in to regain access.';
              this.toastr.error(error);
              this.router.navigateByUrl('/auth/login');
            }
          } else {
            let error = err.error?.message || err.message || err.statusText;
            if (!([401].includes(err.status))) {
              console.log(err);
              const error = err.error?.message || err.message || err.statusText;
              this.toastr.error(error);
            }

            return throwError(() => error);
          }

        })
      );
  }
}
