import { Component, OnInit } from '@angular/core';
import { TemplateInput } from './template-interface';

@Component({
  selector: "app-template1",
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.scss"]
})
export class Template1Component implements OnInit, TemplateInput {

  private template;

  constructor() {
    const baseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const sufixURL = ".png";
    const pokemon = Math.round(Math.random() * 600);
    /* this.template = {
      img1: {
        id: `img1-${0}`,
        src: `${baseURL}${pokemon}${sufixURL}`,
        alt: ""
      },
      img2: {
        id: `img2-${0}`,
        src: `${baseURL}${pokemon}${sufixURL}`,
        alt: ""
      }
    } */
    
  }
  
  ngOnInit() {
    
  }

  getImgId() {
    return this.template && this.template.img1 ? this.template.img1.id : ""
  }

  getImgId2() {
    return this.template && this.template.img2 ? this.template.img2.id : ""
  }

  getImgSrc() {
    return this.template && this.template.img1 ? this.template.img1.src : ""
  }

  getImgAlt() {
    return this.template && this.template.img1 ? this.template.img1.alt : ""
  }

  setTemplateData(template) {
    console.log('setTemplateData', template)
    this.template = template;
  }
}