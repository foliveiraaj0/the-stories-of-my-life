import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { User } from "../models/user-model";
import { UserService } from "../services/user-service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url.endsWith("home")) {
      const user = this.userService.getCachedUser();
      if (user && user.token) {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
    }
    return true;
  }
}
