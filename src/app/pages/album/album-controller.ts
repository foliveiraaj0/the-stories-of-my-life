import { User } from "src/app/models/user-model";
import { Injectable } from "@angular/core";
import { HttpErrorHandler } from "src/app/services/http-error-handler";
import { UserService } from "src/app/services/user-service";
import { Album } from "src/app/models/album-model";
import { Observable } from "rxjs";

@Injectable()
export class AlbumController {
  private userData: User;

  constructor(
    private userService: UserService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.userService.getUser().subscribe(
      (data: User) => {
        this.userData = data;
      },
      error => {
        console.log("couldn't load user data from album");
      }
    );
  }

  getUserData(): User {
    return this.userData;
  }

  sendAlbum(album:Album): Observable<Album> {
    return this.sendAlbum(album);
  }
}
