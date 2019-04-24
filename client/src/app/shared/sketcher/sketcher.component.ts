import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer
} from "@angular/core";
import {
  CdkDragEnter,
  CdkDragEnd,
  CdkDrag,
  CdkDragExit,
  CdkDragMove,
  CdkDragRelease,
  CdkDragStart,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  copyArrayItem
} from "@angular/cdk/drag-drop";
import { OneImageData, TemplateSchemaData } from "./templates";

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

  //private images = [];
  /* private contents: {
    img1: { src: string; alt: string };
    img2: { src: string; alt: string };
  }[] = []; */
  private contents: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];
  private images: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];
  private templates: {
    img1: { id: string; src: string; alt: string };
    img2: { id: string; src: string; alt: string };
  }[] = [];
  /* private images1: { src: string; alt: string }[] = []; */
  private showingTemplates = [];

  private lastPostion;

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
    /* this.contents[0] = this.contentImages[0] */
    this.contents[0] = {
      img1: {
        id: "img1-1",
        src: this.templates[0].img1.src,
        alt: this.templates[0].img1.alt
      },
      img2: {
        id: "img2-2",
        src: this.templates[0].img2.src,
        alt: this.templates[0].img2.alt
      }
    };

    /* this.contents[0] = {
      img1: {
        id: "img1",
        src: this.images[0].img1.src,
        alt: this.images[0].img1.alt
      },
      img2: {
        id: "img2",
        src: this.images[0].img2.src,
        alt: this.images[0].img2.alt
      }
    }; */

    /* this.contentImages[1] = {
      img1: {
        id: "img1",
        src: this.images[1].img1.src,
        alt: this.images[1].img1.alt
      },
      img2: {
        id: "img2",
        src: this.images[1].img2.src,
        alt: this.images[1].img2.alt
      }
    };

    this.contentImages[2] = {
      img1: {
        id: "img1",
        src: this.images[2].img1.src,
        alt: this.images[2].img1.alt
      },
      img2: {
        id: "img2",
        src: this.images[2].img2.src,
        alt: this.images[2].img2.alt
      }
    }; */
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
          id: `imge-${i}`,
          src: `${baseURL}${pokemon}${sufixURL}`,
          alt: ""
        },
        img2: {
          id: `imge-${i}`,
          src: `${baseURL}${pokemon}${sufixURL}`,
          alt: ""
        }
      });
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
          id: "img1-" + i,
          src: img.src,
          alt: img.alt
        },
        img2: {
          id: "img2-" + i,
          src: img.src,
          alt: img.alt
        }
      });
    }
  }

  getConections() {
    return ["img1-1", "img2-2"];
  }

  /*  predicateTemplate(
    drag: CdkDrag<{ src: string; alt: string }>,
    drop: CdkDropList
  ) {
    
    console.log("predicateTemplate", drag);
    console.log("predicateTemplate", drop);
    return true;
  }  */

  drop(
    event: CdkDragDrop<
      any
      /* [{ src: string; alt: string }] 
      | 
      [
        {
          img1: { src: string; alt: string };
          img2: { src: string; alt: string };
        }
      ] */
    >
  ) {
    console.log("dropped", event);
    this.isDragging = false;
    //event.source.reset();
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ended(event: CdkDragEnd<{ src: string; alt: string }>) {
    console.log("ended", event);
    this.isDragging = false;
    //event.source.reset();
  }

  enter(event: CdkDragEnter<OneImageData>) {
    console.log("enter", event.item.data);
    const data = event.item.data;
    //this.contents[0] = [new OneImageData(data.img, data.text)]
  }

  release(event: CdkDragRelease<OneImageData>) {
    const delta = this.getDisplacement(event);

    console.log("release", event, delta);
    this.lastPostion = null;
  }

  start(event: CdkDragStart<OneImageData>) {
    console.log("start", event, this.lastPostion);
    this.isDragging = true;
  }

  moved(event: CdkDragMove<OneImageData>) {
    //console.log('move', event);
    this.lastPostion = event;
  }

  exit(event: CdkDragExit<OneImageData>) {
    console.log("exit", event.item.data);
    this.contents = [];
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
    console.log(scrollPostion);
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
