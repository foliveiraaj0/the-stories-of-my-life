import { CdkDragDrop, CdkDragEnter } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { TemplateContainerInterface } from '../../interfaces/template-container.interface';
import { TemplateInterface } from '../../interfaces/template-interface';
import { TemplateData, TemplateImage as TemplateImageItem, TemplateText as TemplateTextItem } from '../../template-model';
import { TemplateOutputInterface } from '../../interfaces/template-output.interface';

@Component({
  templateUrl: "./template-OLITR.component.html",
  styleUrls: ["./template-OLITR.component.scss"]
})
export class TemplateOLITRComponent implements OnInit, TemplateInterface {
  
  private templateData: TemplateData;
  private outputInterface:TemplateOutputInterface
  private containerInterface: TemplateContainerInterface;

  constructor() {
  }
  
  ngOnInit() {

  }

  private createTemplateItems() {
    const templateId:string = `${this.templateData.id}`;
    const oneLeftImage: TemplateImageItem = new TemplateImageItem(`img-left-${templateId}`,
      "", "");
    this.templateData.templateItems.push(oneLeftImage);
    const textRight: TemplateTextItem = new TemplateTextItem(`text-right-${templateId}`, "");
    this.templateData.templateItems.push(textRight);
  }

  private getConnections(): string[] {
    let connections: string[] = []
    this.templateData.templateItems.forEach(item => {
      if(item instanceof TemplateImageItem) {
        connections.push(item.id);
      }
    });
    return connections;
  }

  setOutputInterfce(outputInterface) {
    this.outputInterface = outputInterface;
  }

  setTemplateData(template:TemplateData) {
    console.log('setTemplateData', template)
    this.templateData = template;
    this.createTemplateItems();
    if(this.outputInterface) {
      const connections:string[] = this.getConnections();
      this.outputInterface.emitConnections(connections);
    }
  }

  getLeftImage(): string {
    let leftImageSrc = "";
    this.templateData.templateItems.forEach(element => {
      if(element instanceof TemplateImageItem) {
        leftImageSrc = (<TemplateImageItem>element).src;
      }
    })
    return leftImageSrc;
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
    console.log(JSON.stringify(this.templateData));
    this.templateData.templateItems.forEach(element => {
      if(element.id === componentId) {
        if(element instanceof TemplateImageItem) {
          (<TemplateImageItem>element).src = data.src;
          (<TemplateImageItem>element).alt = data.alt;  
        }
      }
    });
    /* if(componentId.startsWith('img1')) {
      this.templateData.img1.src = data.src;
      this.templateData.img1.alt = data.alt;
    }
    else {
      this.templateData.img2.src = data.src;
      this.templateData.img2.alt = data.alt;
    } */
    
  }
  
}
