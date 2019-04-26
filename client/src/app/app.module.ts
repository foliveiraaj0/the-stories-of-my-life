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
import { HttpErrorHandler } from './services/http-error-handler';
import { Template1Component } from './templates/template1.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    Template1Component,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [HttpClient, HttpErrorHandler, UrlHelper, UserService, LogService, AuthGuard],
  entryComponents: [ Template1Component ],
  bootstrap: [AppComponent]
})
export class AppModule { }
