import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  CdkDragEnd,
  CdkDragMove,
  CdkDragEnter
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit {
  @ViewChild("contentList") contentList: ElementRef;

  templates: {
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

  constructor(private componentRef: ElementRef) {
    this.fillTemplatesList();
    this.fillImagesList();
  }

  ngOnInit() {}

  fillTemplatesList() {
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
      //TODO remove this testing code
      if (i < 0) {
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
      }
    }
  }

  fillImagesList() {
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

  getConections() {
    const conections = [];
    for (let i = 0; i < this.contents.length; i++) {
      conections.push(`img1-${i}`);
      conections.push(`img2-${i}`);
    }
    return conections;
  }

  drop(event: CdkDragDrop<any>) {
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
    if (this.isInside) {
      const idString = event.container.id;
      const indexOfPosition = idString.indexOf("-") + 1;
      const index = +idString.substring(indexOfPosition);

      //using copyArrayItem in this scenary will add a new item to contentList instead of
      //just changing the contents of the item inside of it
      event.container.data[index] = this.swapData(
        event.container.data[index],
        event.previousContainer.data[event.previousIndex]
      );
      //console.log(event.previousContainer.data);
      //console.log(event.container);
    }
  }

  private swapData(receiving, passing) {
    receiving.img1.src = passing.img1.src;
    receiving.img1.alt = passing.img1.alt;
    receiving.img2.src = passing.img2.src;
    receiving.img2.alt = passing.img2.alt;
    return receiving;
  }

  //TODO evaluate if an object is being dropped inside a container
  isInsideContainerImage(event: CdkDragDrop<any> | CdkDragMove): boolean {
    const sketcherTop = this.componentRef.nativeElement.getBoundingClientRect()
      .top;
    const sketcherLeft = this.componentRef.nativeElement.getBoundingClientRect()
      .left;

    const containerElement = this.selectedContainer.element.nativeElement;
    const left = containerElement.offsetLeft + sketcherLeft;
    const widht = containerElement.offsetWidth;
    const top = containerElement.offsetTop + sketcherTop;
    const height = containerElement.offsetHeight;

    const x = this.pos.x;
    const y = this.pos.y;

    const insideX = x >= left && x <= left + widht;
    const insideY = y >= top && y <= top + height;

    //console.log(x,left,widht, insideX)
    //console.log(y,top,height, insideY)

    return insideX && insideY;
  }

  ended(event: CdkDragEnd<any>) {
    console.log("ended", event);
    this.selectedContainer = undefined;
    //console.log(this.getDisplacement(event));
  }

  pos;
  selectedContainer;
  isInside = false;

  moved(event: CdkDragMove<any>) {
    //console.log('moved', event)
    this.pos = event.pointerPosition;
    if (this.selectedContainer) {
      this.isInside = this.isInsideContainerImage(event);
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

  entered(event: CdkDragEnter<any>) {
    console.log("entered", event);
    this.selectedContainer = event.container;
  }
}
