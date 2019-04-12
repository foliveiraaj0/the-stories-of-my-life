import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from './log-service';

@Injectable()
export class HttpErrorHandler {

  constructor(private logService:LogService){}

  handleBadRequest(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  handleUnauthorized(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  handleForbidden(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  handleServerError(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }

  handleUnknownError(err:HttpErrorResponse) {
    this.logService.logHttpError(err)
  }
}