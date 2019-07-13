import { CdkDragDrop, CdkDragEnd, CdkDragEnter, CdkDragMove, copyArrayItem, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UrlHelper } from 'src/app/services/url-helper';
import { TemplateContainerInterface } from "src/app/templates/template-container.interface";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit, TemplateContainerInterface {
  @ViewChild("contentList") contentList: ElementRef;

  private templates: {
    id: string; src: string; alt: string;
  }[] = [];

  private contents: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];

  private images: {
    id: string; src: string; alt: string;
  }[] = [];

  private currentDragPosition;
  private selectedContainer;
  private isInside = false;

  constructor(private componentRef: ElementRef, private urlHelper: UrlHelper) {
    this.fillTemplatesList();
    this.fillImagesList();
  }

  // init

  ngOnInit() {}

  private fillTemplatesList() {
    /* const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.templates = [];
    for (let i = 0; i < 15; i++) {
      const pokemon = Math.round(Math.random() * 600);
      this.templates.push({
        img1: {
          id: `img1-${i}`,
          src: `${baseURL}${pokemon}${sufixURL}`,
          alt: ""
        },
        img2: {
          id: `img2-${i}`,
          src: `${baseURL}${pokemon}${sufixURL}`,
          alt: ""
        }
      });
    } */
    const configTemplates: string[] = this.urlHelper.getTemplateNames();
    for (let i = 0; i < configTemplates.length; i++) {
      this.templates.push({
        id: `img-${i}`,
        src: `http://localhost:9001/assets/templates/${configTemplates[i]}`,
        alt: `${configTemplates[i]}`
      })
    }
  }

  private fillImagesList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.images = [];
    for (let i = 0; i < 10; i++) {
      const pokemon = Math.round(Math.random() * 600);
      const img = { src: `${baseURL}${pokemon}${sufixURL}`, alt: "" };
      this.images.push({
        id: `img-${i}`,
        src: img.src,
        alt: img.alt  
      });
    }
  }

  private getConections() {
    const conections = [];
    for (let i = 0; i < this.contents.length; i++) {
      conections.push(`img-${i}`);
      //conections.push(`img-${i}`);
    }
    if(conections.length > 0) {
      console.log(JSON.stringify(conections))
    }
    return conections;
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
        event.container.data[i].id = "img-" + i;
      }
    } else {
      if (event.previousContainer.connectedTo[0] === "contentList") {
        this.dropTemplate(event);
      }
    }
  }

  private dropTemplate(event: CdkDragDrop<any>) {
    console.log("dropTemplate", event);
    const newData = [];
    event.previousContainer.data.forEach(data => {
      newData.push({
        img1: {
          id: data.id,
          src: data.src,
          alt: data.alt
        },
        img2: {
          id: data.id,
          src: data.src,
          alt: data.alt
        }
      });
    });

    newData[event.previousIndex].id = "img-" + event.currentIndex;
    copyArrayItem(
      newData,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    for (let i = 0; i < event.container.data.length; i++) {
      if (i > event.currentIndex) {
        event.container.data[i].id = "img-" + i;
      }
    }
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
    const insideY = y >= top && y <= top + height;this.selectedContainer

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
