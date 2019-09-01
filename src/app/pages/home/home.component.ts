import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeController } from "./home-controller";
import { HomeResponse } from "./home-response";
import { SketcherComponent } from "../../shared/sketcher/sketcher.component";
import { User } from 'src/app/models/user-model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  private scketcherIsOpen:boolean;

  @ViewChild(SketcherComponent) scketcher: SketcherComponent;
  
  constructor(private homeController: HomeController) {}
  
  ngOnInit() {}

  logout() {
    this.homeController.logout().subscribe((response: HomeResponse) => {
      console.log(response);
    });
  }

  getUserData():User {
    const data = this.homeController.getUserData()
    console.log("get user data: "+data);
    return data;
  }

  openScketcher():void {
    this.scketcherIsOpen = true;
  }

  closeScketcher(): void {
    this.scketcherIsOpen = false;
  }

}
