import { Template1Component } from './template1/template1.component';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateService {
  getType(){
    return Template1Component;
  }
}