import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service";
import { User } from "src/app/models/user-model";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  login() {
    this.userService
      .login("nandogoe@gmail.com", "1234")
      .subscribe(user => console.log("component login", user));
  }

  signin() {
    this.userService
      .signin("fernando oliveira", "1234", "nandogoe4@gmail.com", "13/09/1988")
      .subscribe(user => console.log("component signin", user));
  }

  getUser() {
    this.userService.getUser().subscribe(user => console.log("component getUser", user));
  }

  logout() {
    this.userService.logout().subscribe(user => console.log("component logout", user));
  }
}
