import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TemplateInput } from './template-interface';
import {
  CdkDragDrop,
  CdkDragEnter
} from "@angular/cdk/drag-drop";

@Component({
})
export abstract class Template implements OnInit, TemplateInput {

  protected template;

  @Output() onDrop: EventEmitter<CdkDragDrop<any>> = new EventEmitter();
  @Output() onEnter: EventEmitter<CdkDragEnter<any>> = new EventEmitter();

  ngOnInit() {
    
  }

  setTemplateData(template) {
    console.log('setTemplateData', template)
    this.template = template;
  }
/* 
  protected drop(event: CdkDragDrop<any>) {
    this.onDrop.emit(event)
  }

  protected entered(event: CdkDragEnter<any>) {
    this.onEnter.emit(event)
  }
 */
}