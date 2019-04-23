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

  private scrollValue = 0; //accumulated of steps in percent
  private scrollStep = 50; //percent

  private isDragging = false;

  constructor(private renderer: Renderer) {
    this.fillPokemonList();
    this.fillTemplateList();
    this.showingImages.push(this.images[0]);
    this.showingImages.push(this.images[1]);
    this.showingImages.push(this.images[2]);
    this.showingImages.push(this.images[3]);
  }

  ngOnInit() {}

  fillPokemonList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    this.images = [];
    for (let i = 0; i < 6; i++) {
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

  hasSpace(direction) {
    if (this.imagesList.nativeElement.children) {
      const listElement = this.imagesList.nativeElement;
      const itemHeight = this.imagesList.nativeElement.children[0].clientHeight;
      const allElementsHeight = itemHeight * listElement.childElementCount;
      const listElementHeight = listElement.clientHeight;
      const step = .5 * itemHeight;
      const scrollValuePixel = this.scrollValue / 50 * step

      //console.log(scrollValuePixel, allElementsHeight, listElementHeight, step)
      //console.log(scrollValuePixel + allElementsHeight - step, listElementHeight)

      if (direction === "top") {
        return (
          allElementsHeight + scrollValuePixel - step  >=
          listElementHeight
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
      this.scrollValue +=
        direction === "top" ? -this.scrollStep : this.scrollStep;
      for (let i = 0; i < nativeList.childElementCount; i++) {
        const currentItem = nativeList.children[i];
        //console.log(currentItem)
        //this.renderer.setElementClass(currentBoxObj, 'shift-bottom', true);
        currentItem.style.setProperty(
          "transform",
          "translateY(" + this.scrollValue + "%)"
        );
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
