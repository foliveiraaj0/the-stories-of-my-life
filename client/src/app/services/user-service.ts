import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UrlHelper } from "./url-helper";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "../models/user-model";
import { HttpServiceError } from './http-error-dispatcher';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private urlHelper: UrlHelper) {
    this.urlHelper.getConfig();
  }

  private buildHeaders(token?: string) {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.set("Content-Type", "application/json");
    if (token) {
      headers = headers.set("Authorization", token);
    }
    const httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  signin(
    name: string,
    password: string,
    email: string,
    birthDate: string
  ): Observable<User | HttpServiceError> {
    const url = this.urlHelper.postSigninUrl();
    console.log(url);
    const httpOptions = this.buildHeaders();
    return this.http
      .post<User>(
        url,
        { name: name, password: password, email: email, birthDate: birthDate },
        httpOptions
      )
      .pipe(
        map(
          user => {
            localStorage.setItem("user", JSON.stringify(user));
            console.log("users-service sigin", user);
            return user;
          },
          err => {
            console.log(err);
            return null;
          }
        )
      );
  }

  login(email: string, password: string): Observable<User | HttpServiceError> {
    const url = this.urlHelper.postLoginUrl();
    const httpOptions = this.buildHeaders();
    return this.http
      .post<User>(url, { email: email, password: password }, httpOptions)
      .pipe(
        map(
          user => {
            console.log("user-service login", user);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
          },
          err => {
            console.log(err);
          }
        )
      );
  }

  getUser(): Observable<User | HttpServiceError> {
    const url = this.urlHelper.getUserUrl();
    const user: User = this.getCachedUser();
    if (user) {
      const httpOptions = this.buildHeaders(user.token);
      return this.http.get<User>(url, httpOptions).pipe(
        map(user => {
          console.log("user-service getUser", user);
          return user;
        }),
        catchError(err => {
          return of(new User("","",""))
        })
      );
    } else {
      return null;
    }
  }

  logout(): Observable<User | HttpServiceError> {
    const url = this.urlHelper.postLogoutUrl();
    console.log(url)
    const user: User = this.getCachedUser();
    if (user) {
      const httpOptions = this.buildHeaders(user.token);
      return this.http.post<User>(url, null, httpOptions).pipe(
        map(user => {
          console.log("user-service logout", user);
          return user;
        })
      );
    } else {
      return null;
    }
  }

  getCachedUser(): User {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      console.log("user-service cachedUser", user);
      return user;
    }
    return null;
  }

  cleanUserCached() {
    localStorage.removeItem("user");
  }
}
