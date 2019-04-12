import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginController } from "./login-controller";
import { LoginErrors } from "./login-erros";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild("errorLabel") errorLabel: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loginController: LoginController
  ) {
    this.loginForm = this.fb.group({
      username: ["nandogoe3@gmail.com", [Validators.required, Validators.minLength(3)]],
      password: ["1234", [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {}

  onUserNotRegistered() {
    //this.errorLabel.nativeElement.innerHTML = "username not found";
    this.loginForm.setErrors({ userNotFound: true });
    if (this.loginForm.hasError("userNotFound")) {
      if (this.errorLabel) {
        this.errorLabel.nativeElement.innerHTML = "user not found.";
      } else {
        console.log("error label null");
      }
    }
  }

  onSubmit() {
    this.errorLabel.nativeElement.innerHTML = "";
    const username = this.loginForm.controls["username"].value;
    const password = this.loginForm.controls["password"].value;
    this.loginController
      .login(username, password)
      .subscribe((err: LoginErrors) => {
        this.onLoginError(err);
      });
  }

  onLoginError(err: LoginErrors) {
    switch (err) {
      case LoginErrors.UserNotRegistered:
        this.onUserNotRegistered();
        break;
      default:
    }
  }
}
