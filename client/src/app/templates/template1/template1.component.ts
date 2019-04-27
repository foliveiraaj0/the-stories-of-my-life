import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter
} from "@angular/cdk/drag-drop";
import { TemplateOutputInterface } from '../template-output.interface';
import { TemplateInterface } from '../template-interface';

@Component({
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.scss"]
})
export class Template1Component /* extends TemplateComponent */ implements OnInit, TemplateInterface {

  private template;
  private outputInterface:TemplateOutputInterface

  constructor(/* protected outputInterface:TemplateOutputInterface */) {
  }
  
  ngOnInit() {
    
  }

  setOutputInterfce(outputInterface) {
    this.outputInterface = outputInterface;
  }

  setTemplateData(template) {
    console.log('setTemplateData', template)
    this.template = template;
  }

  drop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    if(this.outputInterface) {
      this.outputInterface.emitDrop(event)
    }
  }

  entered(event: CdkDragEnter<any>) {
    console.log('enter', event)
    if(this.outputInterface) {
      this.outputInterface.emitEnter(event)
    }
  }

  /* private drop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    this.outputInterface.emitDrop(event)
  }

  private entered(event: CdkDragEnter<any>) {
    console.log('enter', event)
    this.outputInterface.emitEnter(event)
  } */


 /*  getImgId() {
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
  } */

  
}