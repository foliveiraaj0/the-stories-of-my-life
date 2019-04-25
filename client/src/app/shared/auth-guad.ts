import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { UserService } from "../services/user-service";

@Injectable()
export class AuthGuard implements CanActivate {
  private tokenRoutes = ["home"];

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.userService.getCachedUser();

    let isTokenRoute = false;
    this.tokenRoutes.forEach(route => {
      if (state.url.endsWith(route)) {
        isTokenRoute = true;
      }
    });

    if (user && user.token) {
      if (isTokenRoute) {
        return true;
      } else {
        this.router.navigate(["home"]);
        return false;
      }
    } else {
      if (isTokenRoute) {
        this.router.navigate(["login"]);
        return false;
      } else {
        return true;
      }
    }
  }
}