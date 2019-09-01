import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SignInController } from "./sign-in.controller";
import { SignInResponse } from "./sign-in-response";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  @ViewChild("signInErrorLabel") signInErrorLabel: ElementRef;

  signinForm: FormGroup;
  signinFormControl: FormControl;

  constructor(
    private signInController: SignInController,
    private fb: FormBuilder
  ) {
    this.signinForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });

    this.signinFormControl = new FormControl("", []);
  }

  ngOnInit() {}

  signin() {
    const name = `${this.signinForm.get("firstName").value} ${
      this.signinForm.get("lastName").value
    }`;
    const password = this.signinForm.get("password").value;
    const email = this.signinForm.get("email").value;
    const birthDate = "00/00/0000";

    this.signInController
      .signin(name, password, email, birthDate)
      .subscribe((response: SignInResponse) => {
        switch (response) {
          case SignInResponse.SignInSuccess:
            {
            }
            break;
          case SignInResponse.UserRegistered: {
            this.onUserAlreadyRegistered();
          }
        }
      });
  }

  private onUserAlreadyRegistered() {
    this.signinForm.setErrors({ userRegistered: true });
  }
}
