import { CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UrlHelper } from "src/app/services/url-helper";
import { TemplateContainerInterface } from "src/app/templates/interfaces/template-container.interface";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit, TemplateContainerInterface {
  @ViewChild("contentList") contentList: ElementRef;

  private backgrounds:string[] = [];

  private contents:string[] = [];

  private users: {
    id: string;
    src: string;
  }[] = [];

  private connections: string[] = [];

  private currentDragPosition;
  private selectedContainer;
  private isInside = false;

  private readonly ID_user_ITEM_PREFIX: string = "user-item-";

  constructor(private componentRef: ElementRef, private urlHelper: UrlHelper) {
    this.fillBackgroundList();
    this.fillImagesList();
  }

  // init

  ngOnInit() {}

  private fillBackgroundList() {
    const configBackgrounds: string[] = this.urlHelper.getBackgrounds();
    for (let i = 0; i < configBackgrounds.length; i++) {
      this.backgrounds.push(this.getImageUrl(configBackgrounds[i]))
    }
  }

  getBackgrounds(): string[] {
    return this.backgrounds;
  }

  getConnections(): string[] {
    return this.connections;
  }

  getContents(): string[] {
    return this.contents;
  }

  getUsers(): {
    id: string;
    src: string;
  }[] {
    return this.users;
  }

  private getImageUrl(imageSrc: string) {
    return `./assets/backgrounds/${imageSrc}`;
  }

  private fillImagesList() {
    const configUsers: string[] = this.urlHelper.getUserNames();
    for (let i = 0; i < configUsers.length; i++) {
      this.users.push({
        id: `users-list-item-${i}`,
        src: `./assets/users/${configUsers[i]}`
      });
    }
  }

  onConnections(event: any) {
    if (event) {
      event.forEach(connection => {
        this.connections.push(connection);
      });
    }
  }

  getIndex() {
    return this.contents.length;
  }

  //DropList events

  drop(event: CdkDragDrop<any>) {
    //console.log("drop", event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      for (let i = 0; i < event.container.data.length; i++) {
        event.container.data[i].id = this.ID_user_ITEM_PREFIX + i;
      }
    } else {
      if (event.previousContainer.connectedTo[0] === "contentList") {
        this.dropTemplate(event);
      }
    }
  }

  /* Add dropped data to contents */
  private dropTemplate(event: CdkDragDrop<string[]>) {
    //console.log("dropTemplate", event);
    const newData = [];
    event.previousContainer.data.forEach(data => {
      newData.push({
        id: `${this.ID_user_ITEM_PREFIX}${this.contents.length}`,
        background: `${data}`
      });
    });

    copyArrayItem(
      newData,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  private isInsideContainerImage(): boolean {
    const sketcherTop = this.componentRef.nativeElement.getBoundingClientRect()
      .top;
    const sketcherLeft = this.componentRef.nativeElement.getBoundingClientRect()
      .left;

    const containerElement = this.selectedContainer.element.nativeElement;
    const left = containerElement.offsetLeft + sketcherLeft;
    const widht = containerElement.offsetWidth;
    const top = containerElement.offsetTop + sketcherTop;
    const height = containerElement.offsetHeight;

    const x = this.currentDragPosition.x;
    const y = this.currentDragPosition.y;

    const insideX = x >= left && x <= left + widht;
    const insideY = y >= top && y <= top + height;
    this.selectedContainer;

    //console.log(x,left,widht, insideX)
    //console.log(y,top,height, insideY)

    return insideX && insideY;
  }

  droppedInsideThisCompnent(): boolean {
    return this.isInside;
  }

  //Drag events

  private ended(event: CdkDragEnd<any>) {
    //console.log("ended", event);
    this.selectedContainer = undefined;
    //console.log(this.getDisuserment(event));
  }

  private moved(event: CdkDragMove<any>) {
    //console.log('moved', event)
    this.currentDragPosition = event.pointerPosition;
    if (this.selectedContainer) {
      this.isInside = this.isInsideContainerImage();
      const className = this.selectedContainer.element.nativeElement.className;
      if (this.isInside) {
        if (className.search("cdk-drop-list-dragging") === -1) {
          this.selectedContainer.element.nativeElement.className +=
            " cdk-drop-list-dragging";
        }
      } else {
        this.selectedContainer.element.nativeElement.className = className.replace(
          "cdk-drop-list-dragging",
          ""
        );
      }
    } else {
      this.isInside = false;
    }
  }

  private entered(event: CdkDragEnter<any>) {
    //console.log("entered", event);
    this.selectedContainer = event.container;
  }
}
