import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GenericHttpInterceptor } from './services/generic-http-interceptor';
import { UrlHelper } from './services/url-helper';
import { UserService } from './services/user-service';
import { LogService } from './services/log-service';
import { AuthGuard } from './auth/auth-guad';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GenericHttpInterceptor, multi: true },
];

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
  providers: [HttpClient, httpInterceptorProviders, UrlHelper, UserService, LogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
