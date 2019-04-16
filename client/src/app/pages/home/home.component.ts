import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeController } from "./home-controller";
import { HomeResponse } from "./home-response";
import { SketcherComponent } from "../../shared/sketcher/sketcher.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild(SketcherComponent) scketcher: SketcherComponent;
  constructor(private homeController: HomeController) {}
  ngOnInit() {}

  logout() {
    this.homeController.logout().subscribe((response: HomeResponse) => {
      console.log(response);
    });
  }
}
