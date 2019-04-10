import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UrlHelper } from './services/url-helper';
import { SharedGalleryService } from './services/shared-galley-service';
import { LoginController } from './login/login-controller';
import { LogService } from './services/log-service';
import { SignInComponent } from './sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth-guad';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignInComponent,
    AboutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient, UrlHelper, SharedGalleryService, LogService, AuthGuard, LoginController],
  bootstrap: [AppComponent]
})
export class AppModule { }
