import { Router } from '@angular/router';
import { UserService } from "src/app/services/user-service";
import { HttpErrorHandler } from "src/app/services/http-error-handler";
import { Observable, of } from "rxjs";
import { SignInResponse } from "./sign-in-response";
import { map, catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';

@Injectable()
export class SignInController {
  constructor(
    private router: Router,
    private userService: UserService,
    private httpErrorHandler: HttpErrorHandler
  ) {}

  signin(
    name: string,
    password: string,
    email: string,
    birthDate: string
  ): Observable<SignInResponse> {
    return this.userService.signin(name, password, email, birthDate).pipe(
      map(user => {
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["home"]);
        return SignInResponse.SignInSuccess;
      }),
      catchError(err => {
        this.httpErrorHandler.handle(err);
        return of(SignInResponse.UserAlreadyRegistered);
      })
    );
  }
}
