import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter
} from "@angular/cdk/drag-drop";
import { TemplateOutputInterface } from '../template-output.interface';
import { TemplateInterface } from '../template-interface';
import { TemplateContainerInterface } from '../template-container.interface';

@Component({
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.scss"]
})
export class Template1Component implements OnInit, TemplateInterface {
  
  private template;
  private outputInterface:TemplateOutputInterface
  private containerInterface: TemplateContainerInterface;

  constructor() {
  }
  
  ngOnInit() {

  }

  setOutputInterfce(outputInterface) {
    this.outputInterface = outputInterface;
  }

  setTemplateData(template) {
    console.log('setTemplateData', template)
    this.template = template;
    if(this.outputInterface) {

      //this.outputInterface.emitConnections()
    }
  }

  setTemplateContainer(containerInterface: TemplateContainerInterface) {
    this.containerInterface = containerInterface;
  }

  drop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    this.dropImage(event)
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

  dropImage(event: CdkDragDrop<any>) {
    console.log("dropImage", event);
    if (this.containerInterface && this.containerInterface.droppedInsideThisCompnent()) {
      //using copyArrayItem in this scenary will add a new item to contentList instead of
      //just changing the contents of the item inside of it
      this.setComponentData(event.previousContainer.data[event.previousIndex], event.container.id);
    }
  }

  setComponentData(data, componentId) {
    console.log('setComponentData');
    console.log(data);
    console.log(JSON.stringify(this.template));
    if(componentId.startsWith('img1')) {
      this.template.img1.src = data.src;
      this.template.img1.alt = data.alt;
    }
    else {
      this.template.img2.src = data.src;
      this.template.img2.alt = data.alt;
    }
    
  }
  
}
