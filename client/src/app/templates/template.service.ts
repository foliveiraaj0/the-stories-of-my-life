import { TemplateOLITRComponent } from './template-OLITR.ts/template-OLITR.component';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateService {
  getType(){
    return TemplateOLITRComponent;
  }
}