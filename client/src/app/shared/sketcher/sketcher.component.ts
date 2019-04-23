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
    this.fillPokemonList();
    this.fillTemplateList();
    this.updateShowingImages(true);
  }

  ngOnInit() {}

  fillPokemonList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.images = [];
    this.images.push({
      src: "",
      alt: ""
    });
    for (let i = 0; i < 18; i++) {
      const pokemon = Math.round(Math.random() * 600);
      this.images.push({
        src: `${baseURL}${pokemon}${sufixURL}`,
        alt: ""
      });
    }
    this.images.push({
      src: "",
      alt: ""
    });
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
    this.allElementsHeight = (this.images.length - 2) * this.itemHeight;
    this.listElementHeight =
      this.listElement.clientHeight - 2 * this.itemHeight;
    this.stepPixel = (this.step / 100) * this.itemHeight;
    this.scrollValuePixel = (this.scrollValue / this.step) * this.stepPixel;
  }

  hasSpace(direction) {
    this.calculateConstants();
    if (this.imagesList.nativeElement.children) {
      if (direction === "top") {
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
      const nativeList = this.imagesList.nativeElement;
      const edgeDiv = 1;
      const blockEdgeDiv = 1;
      this.scrollValue += direction === "top" ? -this.step : this.step;
      const firstIndex = direction === "top" ? edgeDiv + blockEdgeDiv : edgeDiv;
      const lastIndex =
        direction === "top"
          ? nativeList.childElementCount - edgeDiv
          : nativeList.childElementCount - (edgeDiv + blockEdgeDiv);
      for (let i = firstIndex; i < lastIndex; i++) {
        const currentItem = nativeList.children[i];
        if (direction === "top") {
          this.renderer.setElementClass(currentItem, "shift-top", true);
        } else if (direction === "bottom") {
          this.renderer.setElementClass(currentItem, "shift-bottom", true);
        }
      }
    }
  }

  onScrollEnd(event) {
    if (event.animationName === "shiftTop") {
      this.renderer.setElementClass(event.target, "shift-top", false);
    } else {
      this.renderer.setElementClass(event.target, "shift-bottom", false);
    }
    //TODO call this update only in the last scroll event
    this.updateShowingImages();
  }

  updateShowingImages(fromStart?: boolean) {
    const scrollPostion = fromStart ? 0 : this.scrollValue / this.step * -1;
    this.showingImages[0] = this.images[scrollPostion];
    this.showingImages[1] = this.images[scrollPostion + 1];
    this.showingImages[2] = this.images[scrollPostion + 2];
    this.showingImages[3] = this.images[scrollPostion + 3];
    this.showingImages[4] = this.images[scrollPostion + 4];
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
