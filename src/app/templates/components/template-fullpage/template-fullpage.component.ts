import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from '../../template-component';
import { TemplateImageItem } from '../../template-model';

@Component({
  templateUrl: './template-fullpage.component.html',
  styleUrls: ['./template-fullpage.component.scss']
})
export class TemplateFullpageComponent extends TemplateComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

  protected createTemplateItems() {
    const templateId:string = `${this.templateData.id}`;
    const image: TemplateImageItem = new TemplateImageItem(`img-${templateId}`,
      "", "");
    this.templateData.templateItems.push(image);
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

  getImage(): string {
    let imageSrc = "";
    this.templateData.templateItems.forEach(element => {
      if(element instanceof TemplateImageItem) {
        imageSrc = (<TemplateImageItem>element).src;
      }
    })
    return imageSrc;
  }

  getBackground(): string {
    return "url(./assets/templates/frame12.png)";
  }

  getImageId(): string {
    let imageId = "";
    this.templateData.templateItems.forEach(element => {
      if(element instanceof TemplateImageItem) {
        imageId = (<TemplateImageItem>element).id;
      }
    })
    return imageId;
  }
}
