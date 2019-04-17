import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragEnter,
  CdkDragPreview,
  CdkDragPlaceholder,
  CdkDragEnd,
  CdkDrag,
  CdkDragExit
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

  constructor() {
    this.fillPokemonList();
    this.fillTemplateList();
    /* this.templates.forEach(template => {
      this.contents.push(template);
    }); */
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
      const data = event.item.data//event.previousContainer.data[event.previousIndex];
      /* if (this.contents[event.currentIndex]) {
        this.contents.splice(event.currentIndex, 0, new OneImageData(data.img, data.text))
      } else {
        this.contents.push(
          new OneImageData(data.img, "fewfwef")
        );
      } */
      this.contents = [new OneImageData(data.img, data.text)]
    }
  }

  enter(event: CdkDragEnter<OneImageData>) {
    console.log('enter', event.item.data);
    const data = event.item.data
    //this.contents[0] = [new OneImageData(data.img, data.text)]
  }

  exit(event: CdkDragExit<OneImageData>) {
    console.log('exit', event.item.data)
    this.contents = []
  }
}
