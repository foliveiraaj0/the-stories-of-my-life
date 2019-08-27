import { Router } from "@angular/router";
import { UserService } from "src/app/services/user-service";
import { HttpErrorHandler } from "src/app/services/http-error-handler";
import { map, catchError } from "rxjs/operators";
import { HomeResponse } from "./home-response";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class HomeController {
  constructor(
    private router: Router,
    private userService: UserService,
    private httpErrorHandler: HttpErrorHandler
  ) {}

  logout(): Observable<HomeResponse> {
    return this.userService.logout().pipe(
      map(
        user => {
          this.userService.cleanUserCached();
          console.log(user);
          this.router.navigate(["login"]);
          return HomeResponse.LogoutSuccess;
        },
        catchError(err => {
          console.log(err);
          this.httpErrorHandler.handle(err);
          return of(HomeResponse.UnexpectedResponse);
        })
      )
    );
  }
}
