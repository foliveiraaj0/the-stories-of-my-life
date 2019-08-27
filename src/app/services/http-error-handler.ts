import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from './log-service';

@Injectable()
export class HttpErrorHandler {

  constructor(private logService:LogService){}

  handle(err : HttpErrorResponse) {
    if(err){
      switch(err.status) {
        case 400: this.handleBadRequest(err)
        break
        case 401: this.handleUnauthorized(err)
        break
        case 403: this.handleForbidden(err)
        break
        case 500: this.handleServerError(err)
        break
        default: this.handleUnknownError(err)
      }
    }
  }

  private handleBadRequest(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  private handleUnauthorized(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  private handleForbidden(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  private handleServerError(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  private handleUnknownError(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

}