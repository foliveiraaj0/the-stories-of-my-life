import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './auth/auth-guad';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./pages/login/login.module#LoginModule", canActivate: [AuthGuard] },
  { path: "about", loadChildren: "./pages/about/about.module#AboutModule" },
  { path: "signin", loadChildren: "./pages/sign-in/sign-in.module#SignInModule", canActivate: [AuthGuard] },
  { path: "home", loadChildren: "./pages/home/home.module#HomeModule", canActivate: [AuthGuard] },
  { path: "album", loadChildren: "./pages/album/album.module#AlbumModule", canActivate: [AuthGuard] },
  { path: "**", loadChildren: "./pages/not-found/not-found.module#NotFoundModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
