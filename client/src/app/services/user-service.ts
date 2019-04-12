import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UrlHelper } from "./url-helper";
import { Observable, of } from "rxjs";
import { User } from "../models/user-model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private urlHelper: UrlHelper) {
    this.urlHelper.getConfig();
  }

  private buildHeaders(token?: string) {
    let headers: HttpHeaders = new HttpHeaders();
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
  ): Observable<User> {
    const url = this.urlHelper.postSigninUrl();
    const httpOptions = this.buildHeaders();
    return this.http.post<User>(
      url,
      { name: name, password: password, email: email, birthDate: birthDate },
      httpOptions
    );
  }

  login(email: string, password: string): Observable<User> {
    const url = this.urlHelper.postLoginUrl();
    const httpOptions = this.buildHeaders();
    return this.http.post<User>(
      url,
      { email: email, password: password },
      httpOptions
    );
  }

  getUser(): Observable<User> {
    const url = this.urlHelper.getUserUrl();
    const user: User = this.getCachedUser();
    if (user) {
      const httpOptions = this.buildHeaders(user.token);
      return this.http.get<User>(url, httpOptions);
    } else {
      throw new Error("cached data not found");
    }
  }

  logout(): Observable<User> {
    const url = this.urlHelper.postLogoutUrl();
    const user: User = this.getCachedUser();
    if (user) {
      const httpOptions = this.buildHeaders(user.token);
      return this.http.post<User>(url, null, httpOptions);
    } else {
      throw new Error("cached data not found");
    }
  }

  getCachedUser(): User {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);
      return user;
    }
    return null;
  }

  cleanUserCached() {
    localStorage.removeItem("user");
  }
}
