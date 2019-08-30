import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  private data:User;
  
  constructor() { }

  ngOnInit() {
  }

  hasData():boolean {
    console.log(this.data);
    return this.data != undefined;
  }

}
