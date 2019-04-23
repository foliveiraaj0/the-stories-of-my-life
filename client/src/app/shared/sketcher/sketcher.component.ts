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
  CdkDragEnter,
  CdkDragEnd,
  CdkDrag,
  CdkDragExit,
  CdkDragMove,
  CdkDragRelease,
  CdkDragStart
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
  @ViewChild("imageList") imagesList: ElementRef;
  @ViewChild("buttonShiftTop") buttonTop: ElementRef;
  @ViewChild("buttonShiftBottom") buttonBottom: ElementRef;

  private images = [];
  private contents: TemplateSchemaData[] = [];
  private templates: TemplateSchemaData[] = [];
  private showingImages = [];

  private lastPostion;

  private firstImageOnList = 0;

  private scrollValue = 100; //accumulated of steps in percent
  private scrollStep = 100; //percent

  private isDragging = false;

  private listElement;
  private itemHeight;
  private allElementsHeight;
  private listElementHeight;
  private step;
  private scrollValuePixel;

  constructor(private renderer: Renderer) {
    this.fillPokemonList();
    this.fillTemplateList();
    this.showingImages[0] = this.images[0];
    this.showingImages[1] = this.images[1];
    this.showingImages[2] = this.images[2];
    this.showingImages[3] = this.images[3];
    this.showingImages[4] = this.images[4];
  }

  ngOnInit() {
    /*  const nativeList = this.imagesList.nativeElement;
    console.log(nativeList.childElementCount);
    for (let i = 0; i < nativeList.childElementCount; i++) {
      const currentItem = nativeList.children[i];
      //console.log(currentItem)
      //this.renderer.setElementClass(currentBoxObj, 'shift-bottom', true);
      currentItem.style.setProperty(
        "transform",
        "translateY(" + this.scrollValue + "%)"
      );
    } */
  }

  fillPokemonList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.images = [];
    for (let i = 0; i < 8; i++) {
      const pokemon = Math.round(Math.random() * 600);
      this.images.push({
        src: `${baseURL}${pokemon}${sufixURL}`,
        alt: "bla bla bla"
      });
    }
  }

  fillTemplateList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    for (let i = 0; i < 3; i++) {
      const pokemon = Math.round(Math.random() * 600);
      const img = { src: `${baseURL}${pokemon}${sufixURL}`, alt: "dfwf" };
      const text = "wefwmefw";
      this.templates.push(new OneImageData(img, text));
    }
  }

  predicateTemplate(item: CdkDrag<OneImageData>) {
    //console.log('predicateTemplate', item.data)
    return false;
  }

  ended(event: CdkDragEnd<{ src: string; alt: string }>) {
    console.log("ended", event);
    this.isDragging = false;
    event.source.reset();
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
    this.listElement = this.imagesList.nativeElement;
    this.itemHeight = this.imagesList.nativeElement.children[0].clientHeight;
    this.allElementsHeight = this.images.length * this.itemHeight//this.itemHeight * this.listElement.childElementCount;
    this.listElementHeight = this.listElement.clientHeight - 2 * this.itemHeight;
    this.step = this.scrollStep/100 * this.itemHeight;
    const initialDisplacement = this.step;
    this.scrollValuePixel =
      (this.scrollValue / this.scrollStep) * this.step - initialDisplacement;
  }

  hasSpace(direction) {

    this.calculateConstants()
    const initialDisplacement = this.step;

    if (this.imagesList.nativeElement.children) {
      console.log(this.scrollValuePixel, this.allElementsHeight, this.listElementHeight, this.step);
      console.log(
        this.scrollValuePixel + this.allElementsHeight - this.step,
        this.listElementHeight
      );

      if (direction === "top") {
        return this.allElementsHeight + this.scrollValuePixel - this.step >= this.listElementHeight;
      } else if (direction === "bottom") {
        return this.scrollValue < initialDisplacement;
      }
    }
    return false;
  }

  scrollList(direction) {
    if (direction.wheelDeltaY) {
      direction = direction.wheelDeltaY > 0 ? "top" : "bottom";
    }

    if (this.hasSpace(direction)) {
      const nativeList = this.imagesList.nativeElement;
      this.scrollValue +=
        direction === "top" ? -this.scrollStep : this.scrollStep;
      for (let i = 0; i < nativeList.childElementCount; i++) {
        const currentItem = nativeList.children[i];
        //console.log(currentItem)
        //this.renderer.setElementClass(currentBoxObj, 'shift-bottom', true);
        /* currentItem.style.setProperty(
          "transform",
          "translateY(" + this.scrollValue + "%)"
        ); */

        if (this.scrollValue % 100 === 0) {
          if (direction === "top") {
            this.renderer.setElementClass(
              currentItem,
              "shift-top-two-step",
              true
            );
            //this.showingImages[4] = this.images[-1*this.firstImageOnList+5]
          } else if (direction === "bottom") {
          }
        } else {
          if (direction === "top") {
            this.renderer.setElementClass(
              currentItem,
              "shift-top-one-step",
              true
            );
            //this.showingImages[4] = this.images[-1*this.firstImageOnList+5]
          } else if (direction === "bottom") {
          }
        }
      }
      if (this.scrollValue % 100 === 0) {
        if (direction === "top") {
          //this.firstImageOnList--;
          /* if(-1*this.firstImageOnList+5 < this.images.length) {
            this.showingImages[4] = this.images[-1*this.firstImageOnList+5]
          } */
        } else if (direction === "bottom") {
          /*  if(this.firstImageOnList-1 < this.images.length && this.firstImageOnList-1 >= 0) {
            this.firstImageOnList--;
            this.showingImages[0] == this.images[this.firstImageOnList];
          } */
        }
      }
    }
  }

  animationEventCont = 0;

  onScrollEnd(event) {
    this.animationEventCont++;
    if (event.animationName === "shiftTopTwoStep") {
      const initialDisplacement = this.scrollStep;
      this.renderer.setElementClass(event.target, "shift-top-one-step", false);
      this.renderer.setElementClass(event.target, "shift-top-two-step", false);
      const scrollPostion = (this.scrollValue - initialDisplacement) / this.scrollStep * -1;
      console.log('scrollpostion', scrollPostion)
      if (
        this.animationEventCont %
          this.imagesList.nativeElement.childElementCount ===
        0
      ) {
        this.showingImages[0] = this.images[scrollPostion];
        this.showingImages[1] = this.images[scrollPostion+1];
        this.showingImages[2] = this.images[scrollPostion+2];
        this.showingImages[3] = this.images[scrollPostion+3];
        this.showingImages[4] = this.images[scrollPostion+4];
        console.log(event);
        this.animationEventCont = 0;
      }
    }
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
