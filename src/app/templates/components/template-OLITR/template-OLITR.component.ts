import { Component, OnInit } from '@angular/core';
import { TemplateImageItem, TemplateTextItem } from '../../template-model';
import { TemplateComponent } from '../../template-component';

@Component({
  templateUrl: "./template-OLITR.component.html",
  styleUrls: ["./template-OLITR.component.scss"]
})
export class TemplateOLITRComponent extends TemplateComponent implements OnInit {
  
  constructor() {
    super();
  }
  
  ngOnInit() {

  }

  protected createTemplateItems() {
    const templateId:string = `${this.templateData.id}`;
    const oneLeftImage: TemplateImageItem = new TemplateImageItem(`img-left-${templateId}`,
      "", "");
    this.templateData.templateItems.push(oneLeftImage);
    const textRight: TemplateTextItem = new TemplateTextItem(`text-right-${templateId}`, "");
    this.templateData.templateItems.push(textRight);
  }

  protected setComponentData(data, componentId) {
    //console.log('setComponentData');
    //console.log(data);
    //console.log(JSON.stringify(this.templateData));
    this.templateData.templateItems.forEach(element => {
      if(element.id === componentId) {
        if(element instanceof TemplateImageItem) {
          (<TemplateImageItem>element).src = data.src;
          (<TemplateImageItem>element).alt = data.alt;  
        }
      }
    });
    
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

  getImageId(): string {
    let leftImageId = "";
    this.templateData.templateItems.forEach(element => {
      if(element instanceof TemplateImageItem) {
        leftImageId = (<TemplateImageItem>element).id;
      }
    })
    return leftImageId;
  }
}
