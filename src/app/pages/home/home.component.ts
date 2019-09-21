import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeController } from "./home-controller";
import { HomeResponse } from "./home-response";
import { SketcherComponent } from "../../shared/sketcher/sketcher.component";
import { User } from 'src/app/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  private scketcherIsOpen:boolean;

  @ViewChild(SketcherComponent) scketcher: SketcherComponent;
  
  constructor(private homeController: HomeController, private router:Router) {}
  
  ngOnInit() {}

  logout() {
    this.homeController.logout().subscribe((response: HomeResponse) => {
    });
  }

  getUserData():User {
    const data = this.homeController.getUserData()
    return data;
  }

  goToScketcher():void {
    this.router.navigate(["album"]);
  }

  hasAlbums(): boolean {
    return this.homeController.hasAlbums();
  }

}
