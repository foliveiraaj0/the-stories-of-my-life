import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  CdkDragEnd,
  CdkDragMove,
  CdkDragEnter
} from "@angular/cdk/drag-drop";
import { TemplateContainerInterface } from "src/app/templates/template-container.interface";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit, TemplateContainerInterface {
  @ViewChild("contentList") contentList: ElementRef;

  private templates: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];

  private contents: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];

  private images: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];

  private currentDragPosition;
  private selectedContainer;
  private isInside = false;

  constructor(private componentRef: ElementRef) {
    this.fillTemplatesList();
    this.fillImagesList();
  }

  // init

  ngOnInit() {}

  private fillTemplatesList() {
    const baseURL =
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
        img1: {
          id: `img1-${i}`,
          src: img.src,
          alt: img.alt
        },
        img2: {
          id: `img2-${i}`,
          src: img.src,
          alt: img.alt
        }
      });
    }
  }

  private getConections() {
    const conections = [];
    for (let i = 0; i < this.contents.length; i++) {
      conections.push(`img1-${i}`);
      conections.push(`img2-${i}`);
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
        event.container.data[i].img1.id = "img1-" + i;
        event.container.data[i].img2.id = "img2-" + i;
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
          id: data.img1.id,
          src: data.img1.src,
          alt: data.img1.alt
        },
        img2: {
          id: data.img2.id,
          src: data.img2.src,
          alt: data.img2.alt
        }
      });
    });

    newData[event.previousIndex].img1.id = "img1-" + event.currentIndex;
    newData[event.previousIndex].img2.id = "img2-" + event.currentIndex;
    copyArrayItem(
      newData,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    for (let i = 0; i < event.container.data.length; i++) {
      if (i > event.currentIndex) {
        event.container.data[i].img1.id = "img1-" + i;
        event.container.data[i].img2.id = "img2-" + i;
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
