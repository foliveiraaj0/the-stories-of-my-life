import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlHelper } from './services/url-helper';
import { UserService } from './services/user-service';
import { LogService } from './services/log-service';
import { AuthGuard } from './shared/auth-guad';
import { HttpErrorHandler } from './services/http-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [HttpClient, HttpErrorHandler, UrlHelper, UserService, LogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
