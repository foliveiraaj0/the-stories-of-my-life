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
  copyArrayItem
} from "@angular/cdk/drag-drop";
import { OneImageData, TemplateSchemaData } from "./templates";
import { CurrencyIndex } from "@angular/common/src/i18n/locale_data";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit {
  @ViewChild("topElementList") topList: ElementRef;
  @ViewChild("bottomElementList") bottomList: ElementRef;
  @ViewChild("templateList") templateList: ElementRef;
  @ViewChild("buttonShiftTop") buttonTop: ElementRef;
  @ViewChild("buttonShiftBottom") buttonBottom: ElementRef;

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

  private showingTemplates = [];

  private isDragging = false;

  private listElement;
  private itemHeight;
  private allElementsHeight; //without the edges
  private listElementHeight; //without the edges
  private step = 100; //percent
  private stepPixel;
  private scrollValue = 0; //accumulated of steps in percent
  private scrollValuePixel;

  constructor(private renderer: Renderer) {
    this.fillTemplatesList();
    this.fillImagesList();
    this.updateShowingTemplates(true);
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
    return receiving
  }

  isInsideContainerImage(event: CdkDragDrop<any>): boolean {
    return true;
  }

  calculateConstants() {
    const opaqueEdges = 2;
    this.listElement = this.templateList.nativeElement;
    this.itemHeight = this.templateList.nativeElement.children[0].clientHeight;
    this.allElementsHeight =
      (this.templates.length - opaqueEdges) * this.itemHeight;
    this.listElementHeight = this.listElement.clientHeight;
    this.stepPixel = (this.step / 100) * this.itemHeight;
    this.scrollValuePixel = (this.scrollValue / this.step) * this.stepPixel;
  }

  hasSpace(direction) {
    this.calculateConstants();
    if (this.templateList.nativeElement.children) {
      if (direction === "top") {
        //console.log(this.allElementsHeight, this.scrollValuePixel, this.stepPixel, this.listElementHeight)
        //console.log(this.allElementsHeight + this.scrollValuePixel - this.stepPixel, this.listElementHeight)
        return (
          this.allElementsHeight + this.scrollValuePixel - this.stepPixel >=
          this.listElementHeight
        );
      } else if (direction === "bottom") {
        return this.scrollValue < 0;
      }
    }
    return false;
  }

  scrollList(direction) {
    if (direction.wheelDeltaY) {
      direction = direction.wheelDeltaY > 0 ? "top" : "bottom";
    }

    if (this.hasSpace(direction)) {
      const nativeList = this.templateList.nativeElement;
      this.scrollValue += direction === "top" ? -this.step : this.step;
      for (let i = 0; i < nativeList.childElementCount; i++) {
        const currentItem = nativeList.children[i];
        if (direction === "top") {
          if (i === 1) {
            this.renderer.setElementClass(currentItem, "shift-cut-top", true);
          }
          if (i === nativeList.childElementCount - 1) {
            this.renderer.setElementClass(currentItem, "shift-rise-top", true);
          } else {
            this.renderer.setElementClass(currentItem, "shift-top", true);
          }
        } else if (direction === "bottom") {
          if (i === 0) {
            this.renderer.setElementClass(
              currentItem,
              "shift-rise-bottom",
              true
            );
          }
          if (i === nativeList.childElementCount - 2) {
            this.renderer.setElementClass(
              currentItem,
              "shift-cut-bottom",
              true
            );
          } else {
            this.renderer.setElementClass(currentItem, "shift-bottom", true);
          }
        }
      }
    }
  }

  onScrollEnd(event) {
    if (
      event.animationName === "shiftTop" ||
      event.animationName === "shiftCutTop" ||
      event.animationName === "shiftRiseTop"
    ) {
      this.renderer.setElementClass(event.target, "shift-top", false);
      this.renderer.setElementClass(event.target, "shift-cut-top", false);
      this.renderer.setElementClass(event.target, "shift-rise-top", false);
    } else if (
      event.animationName === "shiftBottom" ||
      event.animationName === "shiftCutBottom" ||
      event.animationName === "shiftRiseBottom"
    ) {
      this.renderer.setElementClass(event.target, "shift-bottom", false);
      this.renderer.setElementClass(event.target, "shift-cut-bottom", false);
      this.renderer.setElementClass(event.target, "shift-rise-bottom", false);
    }
    //TODO call this update only in the last scroll event
    this.updateShowingTemplates();
  }

  updateShowingTemplates(fromStart?: boolean) {
    const scrollPostion = fromStart ? 0 : (this.scrollValue / this.step) * -1;
    this.showingTemplates[0] = this.templates[scrollPostion];
    this.showingTemplates[1] = this.templates[scrollPostion];
    this.showingTemplates[2] = this.templates[scrollPostion + 1];
    this.showingTemplates[3] = this.templates[scrollPostion + 2];
    this.showingTemplates[4] = this.templates[scrollPostion + 4];
  }

  getEdgeClass(i: number): string {
    if (i === 0) {
      return "sketcher-edge-image sketcher-edge-image-top";
    } else if (i === this.showingTemplates.length - 1) {
      return "sketcher-edge-image sketcher-edge-image-bottom";
    }
    return "";
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
