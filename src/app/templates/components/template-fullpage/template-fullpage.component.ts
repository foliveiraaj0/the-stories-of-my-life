import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from '../../template-component';

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
    /* const templateId:string = `${this.templateData.id}`;
    const oneLeftImage: TemplateImageItem = new TemplateImageItem(`img-left-${templateId}`,
      "", "");
    this.templateData.templateItems.push(oneLeftImage);
    const textRight: TemplateTextItem = new TemplateTextItem(`text-right-${templateId}`, "");
    this.templateData.templateItems.push(textRight); */
  }

  protected setComponentData(data, componentId) {
    //console.log('setComponentData');
    //console.log(data);
    //console.log(JSON.stringify(this.templateData));
    /* this.templateData.templateItems.forEach(element => {
      if(element.id === componentId) {
        if(element instanceof TemplateImageItem) {
          (<TemplateImageItem>element).src = data.src;
          (<TemplateImageItem>element).alt = data.alt;  
        }
      }
    }); */
  }
}
