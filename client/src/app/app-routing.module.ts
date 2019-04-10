import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AboutComponent } from "./about/about.component";
import { AuthGuard } from "./auth-guad";
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
