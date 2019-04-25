import { Component, OnInit, ViewChild, Output } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem
} from "@angular/cdk/drag-drop";
import { CustomScrollComponent } from "./custom-scroll/custom-scroll.component";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit {
  private showingTemplates = [];

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

  private copyImages: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];

  private isDragging = false;

  constructor() {
    this.fillTemplatesList();
    this.fillImagesList();
  }

  setShowingTemplates(event: any) {
    console.log("got showing templates", event);
    setTimeout(() => {
      this.showingTemplates = event;
    });
  }

  private getEdgeClass(i: number): string {
    if (i === 0) {
      return "edge-image edge-image-top";
    } else if (i === this.showingTemplates.length - 1) {
      return "edge-image edge-image-bottom";
    }
    return "";
  }

  ngOnInit() {
    /* if(this.templateList) {
      console.log('templateList onInit', this.templateList.getShowingTemplates())
    } */
  }

  fillTemplatesList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    const templates = [];
    for (let i = 0; i < 15; i++) {
      const pokemon = Math.round(Math.random() * 600);
      templates.push({
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
      //TODO remove this testing code
      /* if (i < 0) {
        this.contents.push({
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
    }
    this.templates = templates;
  }

  fillImagesList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.images = [];
    for (let i = 0; i < 15; i++) {
      const pokemon = Math.round(Math.random() * 600);
      const img = { src: `${baseURL}${pokemon}${sufixURL}`, alt: "" };
      //this.images.push(img);
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
      this.copyImages.push({
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

  getConections() {
    const conections = [];
    for (let i = 0; i < this.contents.length; i++) {
      conections.push(`img1-${i}`);
      conections.push(`img2-${i}`);
    }
    return conections;
  }

  drop(event: CdkDragDrop<any>) {
    this.isDragging = false;
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
      } else {
        this.dropImage(event);
      }
    }
  }

  dropTemplate(event: CdkDragDrop<any>) {
    console.log("dropTemplate", event);
    this.isDragging = false;
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

  dropImage(event: CdkDragDrop<any>) {
    console.log("dropImage", event);
    this.isDragging = false;
    if (this.isInsideContainerImage(event)) {
      const idString = event.container.id;
      const indexOfPosition = idString.indexOf("-") + 1;
      const index = +idString.substring(indexOfPosition);

      //using copyArrayItem in this scenary will add a new item to contentList instead of
      //just changing the contents of the item inside of it
      event.container.data[index] = this.swapData(
        event.container.data[index],
        event.previousContainer.data[event.previousIndex]
      );
      console.log(event.previousContainer.data);
      console.log(event.container);
    }
  }

  private swapData(receiving, passing) {
    receiving.img1.src = passing.img1.src;
    receiving.img1.alt = passing.img1.alt;
    receiving.img2.src = passing.img2.src;
    receiving.img2.alt = passing.img2.alt;
    return receiving;
  }

  isInsideContainerImage(event: CdkDragDrop<any>): boolean {
    return true;
  }

  private getDisplacement(event): { x: number; y: number } {
    const delta = { x: Infinity, y: Infinity };

    const style = event.source.element.nativeElement.attributes.getNamedItem(
      "style"
    );

    if (style) {
      let startValueIndex = style.value.indexOf("(") + 1;
      let styleValue = style.textContent.substring(startValueIndex);
      let endValueIndex = styleValue.indexOf("p");
      delta.x = +styleValue.substring(0, endValueIndex);
      startValueIndex = styleValue.indexOf(",") + 1;
      styleValue = styleValue.substring(startValueIndex);
      endValueIndex = styleValue.indexOf("p");
      delta.y = +styleValue.substring(0, endValueIndex);
    }
    return delta;
  }
}
