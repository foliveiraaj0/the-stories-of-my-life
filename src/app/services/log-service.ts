import { isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export class LogService {

  logHttpError(err:HttpErrorResponse) {
    if(isDevMode()) {
      if (err) {
        console.log(`status: ${err.status}
        url: ${err.url}
        message: ${err.message}`)
      }
      else {
        console.log('http error is null');
      }
    }
  }
}