import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlHelper } from './services/url-helper';
import { SharedGalleryService } from './services/shared-galley-service';
import { LogService } from './services/log-service';
import { AuthGuard } from './auth-guad';

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
  providers: [HttpClient, UrlHelper, SharedGalleryService, LogService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
