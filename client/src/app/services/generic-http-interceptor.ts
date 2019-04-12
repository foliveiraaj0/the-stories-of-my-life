import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class GenericHttpInterceptor  implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('intercepting headers', JSON.stringify(req.headers))
      console.log('intercepting body', JSON.stringify(req.body))
    return next.handle(req);
  }
}