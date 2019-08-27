import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SignInController } from './sign-in.controller';
import { SignInResponse } from './sign-in-response';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  @ViewChild("signInErrorLabel") signInErrorLabel: ElementRef;

  private signInObject = {
    name: "fernando oliveira",
    password: "1234",
    email: "nandogoe4@gmail.com",
    birthDate: "13/09/1988"
  };

  constructor(
    private signInController: SignInController
  ) {}

  ngOnInit() {}

  signin() {
    this.signInController.signin(
      this.signInObject.name,
      this.signInObject.password,
      this.signInObject.email,
      this.signInObject.birthDate).subscribe((response:SignInResponse) => {
        switch(response) {
          case SignInResponse.SignInSuccess: {

          }
          break;
          case SignInResponse.UserAlreadyRegistered: {
            this.signInErrorLabel.nativeElement.innerHTML = "this user is already registered"
          }
        }
      })
  }

  
}
