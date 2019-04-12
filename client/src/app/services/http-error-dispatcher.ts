import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from './log-service';

export enum HttpServiceError {
  Unauthorized=401, BadRequest=400, Forbidden=403, ServerError=500, UnknownError
}

@Injectable()
export class HttpErrorDispatcher {
  
  constructor(private logService:LogService){}

  dispatche(err : HttpErrorResponse):HttpServiceError {
    if(err){
      switch(err.status) {
        case 400: return HttpServiceError.BadRequest
        case 401: return HttpServiceError.Unauthorized
        case 403: return HttpServiceError.Forbidden
        case 500: return HttpServiceError.ServerError
        default: {
          this.logService.logHttpError(err)
          return HttpServiceError.UnknownError
        }
      }
    }
  }

}