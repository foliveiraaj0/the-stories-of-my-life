import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { UserService } from "src/app/services/user-service";
import { User } from "src/app/models/user-model";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"]
})
export class UserMenuComponent implements OnInit {
  @Input()
  private buttonWidth: number;

  @Input()
  private buttonHeight: number;

  @ViewChild("menuButton") menuButton: ElementRef;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.buttonWidth) {
      this.renderer.setStyle(
        this.menuButton.nativeElement,
        "width",
        this.getButtonWidth()
      );
    }
    if (this.buttonHeight) {
      this.renderer.setStyle(
        this.menuButton.nativeElement,
        "height",
        this.getButtonHeight()
      );
    }
  }

  getButtonWidth(): string {
    return `${this.buttonWidth}rem`;
  }

  getButtonHeight(): string {
    return `${this.buttonHeight}rem`;
  }

  logout(): void {
    this.userService
      .logout()
      .toPromise()
      .then((user: User) => {
        console.log('logout')
        this.userService.cleanUserCached();
        this.router.navigate(["login"]);
      })
      .catch(error => {
        this.userService.cleanUserCached();
        this.router.navigate(["login"]);
      });
  }
}
