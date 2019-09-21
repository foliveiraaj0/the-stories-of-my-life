import { TemplateOLITRComponent } from './components/template-OLITR/template-OLITR.component';
import { Injectable, Type, Component } from '@angular/core';
import { TemplateName } from './template-model';
import { TemplateFullpageComponent } from './components/template-fullpage/template-fullpage.component';

@Injectable()
export class TemplateService {
  getType(templateName: TemplateName): Type<any>{
    let templateComponentType: Type<any> = null;
    switch(templateName) {
      case TemplateName.OLITR: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.ORITL: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.TILTR: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.TIRTL: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.TWOI: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.THREEI: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.FOURI: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.SIXI: templateComponentType = TemplateOLITRComponent;
      break;
      case TemplateName.EIGHTI: templateComponentType = TemplateOLITRComponent;
      break;
      default:
        templateComponentType = TemplateFullpageComponent; //TODO create an empty template  

    }
    return templateComponentType;
  }
}