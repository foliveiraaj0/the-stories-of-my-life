import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragEnter
} from "@angular/cdk/drag-drop";
import {
  OneImageSchema,
  TemplateSchema,
  TwoImageSchema,
  OneImageData
} from "./templates";

@Component({
  selector: "app-sketcher",
  templateUrl: "./sketcher.component.html",
  styleUrls: ["./sketcher.component.scss"]
})
export class SketcherComponent implements OnInit {
  private images = [];
  private contents: TemplateSchema[] = [];
  private templates: TemplateSchema[] = [];

  constructor() {
    this.fillPokemonList();
    this.fillTemplateList();
    /* this.templates.forEach(template => {
      this.contents.push(template);
    }); */
  }

  ngOnInit() {}

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
      this.templates.push(new OneImageSchema(new OneImageData(img, text)));
    }
  }

  drop(event: CdkDragDrop<OneImageSchema[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      console.log(event.previousContainer.data[event.previousIndex]);
      const img = event.previousContainer.data[event.previousIndex].data.img;
      const imgData =  {src: img.src, alt: img.alt};
      if (this.contents[event.currentIndex]) {
        this.contents[event.currentIndex].setData(
          OneImageSchema.IMG_LEFT,
          new OneImageData(imgData, null)
        );
        this.contents[event.currentIndex].setData(
          OneImageSchema.TEXT_RIGHT,
          new OneImageData(null, "ewfnwofweiofnweionfeiownfioe")
        );
      } else {
        this.contents.push(
          new OneImageSchema(new OneImageData(imgData, "fewfwef"))
        );
      }
    }
  }

  enter(event: CdkDragEnter) {
    console.log(event);
  }
}
