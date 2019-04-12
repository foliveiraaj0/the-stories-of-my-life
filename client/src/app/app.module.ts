import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlHelper } from './services/url-helper';
import { UserService } from './services/user-service';
import { LogService } from './services/log-service';
import { AuthGuard } from './auth/auth-guad';
import { HttpErrorDispatcher } from './services/http-error-dispatcher';
import { HttpErrorHandler } from './services/http-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [HttpClient, HttpErrorHandler, HttpErrorDispatcher, UrlHelper, UserService, LogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
