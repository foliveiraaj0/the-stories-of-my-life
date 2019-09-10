import { Router } from "@angular/router";
import { UserService } from "src/app/services/user-service";
import { HttpErrorHandler } from "src/app/services/http-error-handler";
import { map, catchError } from "rxjs/operators";
import { HomeResponse } from "./home-response";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from 'src/app/models/user-model';
import { Album } from 'src/app/models/album-model';

@Injectable()
export class HomeController {
  
  private userData: User;
  private albums: Album[];
  
  constructor(
    private router: Router,
    private userService: UserService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.userService.getUser().subscribe(
      (data:User) => {
        console.log('loading user data from home: '+JSON.stringify(data));
        this.userData = data;
    }, 
      error => {
        console.log("couldn't load user data from home");
    });
  }

  logout(): Observable<HomeResponse> {
    return this.userService.logout().pipe(
      map(
        user => {
          this.userService.cleanUserCached();
          console.log(user);
          this.router.navigate(["login"]);
          return HomeResponse.LogoutSuccess;
        },
        catchError(err => {
          console.log(err);
          this.httpErrorHandler.handle(err);
          return of(HomeResponse.UnexpectedResponse);
        })
      )
    );
  }

  getUserData():User {
    return this.userData;
  }

  hasAlbums(): boolean {
    return this.albums != undefined;
  }

}
