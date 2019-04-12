import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler';

@Injectable()
export class HttpErrorDispatcher {

  constructor(private httpErrorHandler:HttpErrorHandler){}

  dispatch(err : HttpErrorResponse) {
    if(err){
      switch(err.status) {
        case 400: this.httpErrorHandler.handleBadRequest(err)
        break
        case 401: this.httpErrorHandler.handleUnauthorized(err)
        break
        case 403: this.httpErrorHandler.handleForbidden(err)
        break
        case 500: this.httpErrorHandler.handleServerError(err)
        break
        default: this.httpErrorHandler.handleUnknownError(err)
      }
    }
  }

}