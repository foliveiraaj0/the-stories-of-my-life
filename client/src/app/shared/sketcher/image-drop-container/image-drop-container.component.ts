import { Component, OnInit } from '@angular/core';
import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { OneImageData } from '../templates';

@Component({
  selector: 'app-image-drop-container',
  templateUrl: './image-drop-container.component.html',
  styleUrls: ['./image-drop-container.component.scss']
})
export class ImageDropContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  enter(event: CdkDragEnter<OneImageData>) {
    console.log('enter imageDropContainer', event.item.data);
  }

  exit(event: CdkDragExit<OneImageData>) {
    console.log('exit imageDropContainer', event.item.data)
  }

}
