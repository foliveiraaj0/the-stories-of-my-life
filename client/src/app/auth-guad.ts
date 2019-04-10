import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(state.url.endsWith("home")) {
      const token = localStorage.getItem("token");
      if(token) {
        return true;
      }
      else {
        this.router.navigate(['']);
        return false;
      }
    }
    return true;
  }
}
