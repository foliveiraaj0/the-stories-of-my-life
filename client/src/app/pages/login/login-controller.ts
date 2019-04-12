import { Injectable } from "@angular/core";
import { UserService } from "../../services/user-service";
import { Router } from "@angular/router";
import { LogService } from "../../services/log-service";
import { LoginErrors } from "./login-erros";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class LoginController {
  constructor(
    private userService: UserService,
    private router: Router,
    private logService: LogService
  ) {}

  login(username: string, password: string): Observable<LoginErrors> {
    return this.userService.login(username, password).pipe(
      map(data => {
        if (data) {
          this.router.navigate(["home"]);
          return LoginErrors.NoError;
        }
      }),
      catchError(err => {
        if (err && err.status === 403) {
          return of(LoginErrors.UserNotRegistered);
        } else {
          this.logService.logHttpError(err);
          return of(LoginErrors.UndefinedError);
        }
      })
    );
  }
}
