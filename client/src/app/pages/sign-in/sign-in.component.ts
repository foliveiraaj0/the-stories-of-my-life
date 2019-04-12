import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service";
import { HttpErrorDispatcher } from "src/app/services/http-error-dispatcher";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  constructor(
    private userService: UserService,
    private httpErrorDispacher: HttpErrorDispatcher
  ) {}

  ngOnInit() {}

  login() {
    this.userService.login("nandogoe@gmail.com", "1234").subscribe(
      user => console.log("component login", user),
      err => {
        if (err.status) {
          switch (err.status) {
            case 401:
              console.log("err component", err);
              break;
            default:
              this.httpErrorDispacher.dispatch(err);
          }
        }
      }
    );
  }

  signin() {
    this.userService
      .signin("fernando oliveira", "1234", "nandogoe4@gmail.com", "13/09/1988")
      .subscribe(
        user => console.log("component signin", user),
        err => {
          if (err.status) {
            switch (err.status) {
              case 401:
                console.log("err component", err);
                break;
              default:
                this.httpErrorDispacher.dispatch(err);
            }
          }
        }
      );
  }

  getUser() {
    this.userService.getUser().subscribe(
      user => console.log("component getUser", user),
      err => {
        if (err.status) {
          switch (err.status) {
            case 401:
              console.log("err component", err);
              break;
            default:
              this.httpErrorDispacher.dispatch(err);
          }
        }
      }
    );
  }

  logout() {
    return this.userService.logout().subscribe(
      user => console.log("component logout", user),
      err => {
        if (err.status) {
          switch (err.status) {
            case 401:
              console.log("err component", err);
              break;
            default:
              this.httpErrorDispacher.dispatch(err);
          }
        }
      }
    );
  }
}
