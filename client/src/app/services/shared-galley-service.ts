import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UrlHelper } from "./url-helper";
import { Observable } from "rxjs";

@Injectable()
export class SharedGalleryService {
  constructor(private http: HttpClient, private urlHelper: UrlHelper) {
    this.urlHelper.getConfig();
  }

  private buildHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: token
      })
    };
    /* 
      const headers: HttpHeaders = new HttpHeaders();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", token);
      const httpOptions = {
        headers: headers
      }; 
      return httpOptions
    */
  }

  login(name: string, password: string): Observable<any> {
    const url = this.urlHelper.postLoginUrl();
    const headers: HttpHeaders = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(
      url,
      { username: name, password: password },
      { headers }
    );
  }

  getUser() {
    const url = this.urlHelper.getUserUrl();
    const token = localStorage.getItem("token");
    if (token) {
      const httpOptions = this.buildHeaders(token);
      this.http.get(url, httpOptions).subscribe((data: any) => {
        console.log(JSON.stringify(data));
      });
    }
  }
}
