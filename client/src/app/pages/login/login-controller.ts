import { Injectable } from "@angular/core";
import { UserService } from "../../services/user-service";
import { Router } from "@angular/router";
import { LogService } from "../../services/log-service";
import { LoginResponse } from "./login-response";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpErrorHandler } from "src/app/services/http-error-handler";

@Injectable()
export class LoginController {
  constructor(
    private userService: UserService,
    private router: Router,
    private logService: LogService,
    private httpErrorHandler: HttpErrorHandler
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.userService.login(username, password).pipe(
      map(user => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(["home"]);
          return LoginResponse.LoginSuccess;
        }
      }),
      catchError(err => {
        if (err.status) {
          switch (err.status) {
            case 400:
              this.logService.logHttpError(err);
              return of(LoginResponse.UserNotRegistered);
            default: {
              this.httpErrorHandler.handle(err);
            }
          }
        }
        return of(LoginResponse.UnexpectedResponse);
      })
    );
  }
}
