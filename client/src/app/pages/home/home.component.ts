import { Component, OnInit } from '@angular/core';
import { HomeController } from './home-controller';
import { HomeResponse } from './home-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeController:HomeController) { }

  ngOnInit() {
  }

  logout() {
    this.homeController.logout().subscribe((response:HomeResponse) => {
      console.log(response)
    })
  }

}
