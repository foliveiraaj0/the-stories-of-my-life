import { Component, OnInit, ViewChild } from "@angular/core";
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
import {
  OneImageData, TemplateSchemaData
} from "./templates";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit {
  private images = [];
  private contents: TemplateSchemaData[] = [];
  private templates: TemplateSchemaData[] = [];

  private lastPostion;

  constructor() {
    this.fillPokemonList();
    this.fillTemplateList();
  }

  ngOnInit() {
    
  }

  fillPokemonList() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    for (let i = 0; i < 10; i++) {
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

  ended(event: CdkDragEnd<{src:string, alt:string}>) {
    console.log('ended', event)
  }

  predicateTemplate(item: CdkDrag<OneImageData>) {
    //console.log('predicateTemplate', item.data)
    return false;
  }

  drop(event: CdkDragDrop<OneImageData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('drop', event.item.data.img.src);
      const data = event.item.data
      //this.contents.splice(event.currentIndex, 0, new OneImageData(data.img, data.text))
      this.contents = [new OneImageData(data.img, data.text)]
    }
  }

  enter(event: CdkDragEnter<OneImageData>) {
    console.log('enter', event.item.data);
    const data = event.item.data
    //this.contents[0] = [new OneImageData(data.img, data.text)]
  }

  release(event: CdkDragRelease<OneImageData>) {
    
    const delta = this.getDisplacement(event)
    
    console.log('release', event, delta)
    this.lastPostion = null;
    
  }

  private getDisplacement(event): {x:number, y: number} {
    const delta = {x:Infinity, y:Infinity};

    const style = event.source.element.nativeElement.attributes.getNamedItem("style")

    if(style) {
      let startValueIndex = style.value.indexOf('(') + 1
      let styleValue = style.textContent.substring(startValueIndex)
      let endValueIndex = styleValue.indexOf('p')
      delta.x = +styleValue.substring(0,endValueIndex)
      startValueIndex =  styleValue.indexOf(',') + 1
      styleValue = styleValue.substring(startValueIndex)
      endValueIndex = styleValue.indexOf('p')
      delta.y = +styleValue.substring(0, endValueIndex)
    }
    return delta;
  }

  start(event: CdkDragStart<OneImageData>) {
    console.log('start', event, this.lastPostion)
  }

  moved(event: CdkDragMove<OneImageData>) {
    //console.log('move', event);
    this.lastPostion = event;
  }

  enterLeft(event: CdkDragEnter<OneImageData>) {
    console.log('enter left', event.item.data);
    const data = event.item.data
    //this.contents[0] = [new OneImageData(data.img, data.text)]
  }

  enterRight(event: CdkDragEnter<OneImageData>) {
    console.log('enter right', event.item.data);
    const data = event.item.data
    //this.contents[0] = [new OneImageData(data.img, data.text)]
  }

  exit(event: CdkDragExit<OneImageData>) {
    console.log('exit', event.item.data)
    this.contents = []
  }
}
