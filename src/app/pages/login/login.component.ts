import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LoginController } from "./login-controller";
import { LoginResponse } from "./login-response";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormControl:FormControl;
  @ViewChild("errorLabel") errorLabel: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loginController: LoginController

  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]
      ],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });

    this.loginFormControl = new FormControl('', [
      
    ]);
  }

  ngOnInit() {}

  onSubmit() {
    const username = this.loginForm.controls["username"].value;
    const password = this.loginForm.controls["password"].value;
    this.loginController
      .login(username, password)
      .subscribe((response: LoginResponse) => {
        if (response === LoginResponse.UserNotRegistered) {
          this.onUserNotRegistered();
        }
      });
  }

  onUserNotRegistered() {
    this.loginForm.setErrors({ userNotFound: true });
  }
}
