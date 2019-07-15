import { CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TemplatePresentation } from 'src/app/models/template-presentation';
import { UrlHelper } from "src/app/services/url-helper";
import { TemplateContainerInterface } from "src/app/templates/interfaces/template-container.interface";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit, TemplateContainerInterface {
  @ViewChild("contentList") contentList: ElementRef;

  private templates:TemplatePresentation[] = [];

  private contents:string[] = [];

  private places: {
    id: string;
    src: string;
    alt: string;
  }[] = [];

  private connections: string[] = [];

  private currentDragPosition;
  private selectedContainer;
  private isInside = false;

  private readonly ID_PLACE_ITEM_PREFIX: string = "place-item-";

  constructor(private componentRef: ElementRef, private urlHelper: UrlHelper) {
    this.fillTemplatesList();
    this.fillImagesList();
  }

  // init

  ngOnInit() {}

  private fillTemplatesList() {
    const configTemplates: TemplatePresentation[] = this.urlHelper.getTemplates();
    for (let i = 0; i < configTemplates.length; i++) {
      let template:TemplatePresentation = configTemplates[i];
      //console.log(JSON.stringify(template))
      template.imageSrc = this.getImageUrl(template.imageSrc);
      this.templates.push(template)
        //new TemplateData(TemplateName.template1))
        /* {
          src: `http://localhost:9001/assets/templates/${configTemplates[i]}`,
          alt: `${configTemplates[i]}`
        } */
      
    }
  }

  private getImageUrl(imageSrc: string) {
    return `http://localhost:9001/assets/templates/${imageSrc}`;
  }

  private fillImagesList() {
    const configPlaces: string[] = this.urlHelper.getPlaceNames();
    for (let i = 0; i < configPlaces.length; i++) {
      this.places.push({
        id: `places-list-item-${i}`,
        src: `http://localhost:9001/assets/places/${configPlaces[i]}`,
        alt: `${configPlaces[i]}`
      });
    }
  }

  onConnections(event: any) {
    if (event) {
      event.forEach(connection => {
        this.connections.push(connection);
      });
    }
    console.log('connections - '+JSON.stringify(this.connections))
  }

  getIndex() {
    return this.contents.length;
  }

  private getConections() {
    return this.connections;
  }

  //DropList events

  private drop(event: CdkDragDrop<any>) {
    console.log("drop", event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      for (let i = 0; i < event.container.data.length; i++) {
        event.container.data[i].id = this.ID_PLACE_ITEM_PREFIX + i;
      }
    } else {
      if (event.previousContainer.connectedTo[0] === "contentList") {
        this.dropTemplate(event);
      }
    }
  }

  /* Add dropped data to contents */
  private dropTemplate(event: CdkDragDrop<TemplatePresentation[]>) {
    console.log("dropTemplate", event);
    const newData = [];
    event.previousContainer.data.forEach(data => {
      newData.push({
        id: `${this.ID_PLACE_ITEM_PREFIX}${this.contents.length}`,
        name: `${data.name}`
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
    console.log("ended", event);
    this.selectedContainer = undefined;
    //console.log(this.getDisplacement(event));
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
    console.log("entered", event);
    this.selectedContainer = event.container;
  }
}
