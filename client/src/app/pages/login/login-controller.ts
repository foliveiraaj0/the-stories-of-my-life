import { Injectable } from "@angular/core";
import { SharedGalleryService } from "../../services/shared-galley-service";
import { Router } from "@angular/router";
import { LogService } from "../../services/log-service";
import { LoginErrors } from "./login-erros";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class LoginController {
  constructor(
    private sharedGalleryService: SharedGalleryService,
    private router: Router,
    private logService: LogService
  ) {}

  login(username: string, password: string): Observable<LoginErrors> {
    return this.sharedGalleryService.login(username, password).pipe(
      map(data => {
        if (data) {
          localStorage.setItem("token", JSON.stringify(data));
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

/* data => {
        //console.log(JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data));
        this.router.navigate(["home"]);
        return LoginErrors.NoError;
      },
      err => {
        if(err && err.status === 403) {
          return LoginErrors.UserNotRegistered;
        }
        else {
          this.logService.logHttpError(err);
          return LoginErrors.UndefinedError;
        }
      } 
    );
    )*/

/* subscribe(
      data => {
        //console.log(JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data));
        this.router.navigate(["home"]);
        return LoginErrors.NoError;
      },
      err => {
        if(err && err.status === 403) {
          return LoginErrors.UserNotRegistered;
        }
        else {
          this.logService.logHttpError(err);
          return LoginErrors.UndefinedError;
        }
      }
    ); */
