import { Component, OnInit, Output, EventEmitter, Input, Type, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter
} from "@angular/cdk/drag-drop";
import { TemplateInput } from '../template-interface';
import { ViewReference } from '../template-view-container.directive';
import { TemplateService } from './template.service';
/* import { TemplateService } from './template.service'; */

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.scss"]
})
export class TemplateComponent implements OnInit, TemplateInput {

  /* private _template;
  @Input()
  set template(template) {
    this._template = template;
  }
  get template() {
    return this._template;
  } */

  @Input() template;

  @ViewChild(ViewReference) viewReference;

  @Output() onDrop: EventEmitter<CdkDragDrop<any>> = new EventEmitter();
  @Output() onEnter: EventEmitter<CdkDragEnter<any>> = new EventEmitter();

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected templateService:TemplateService) {
      this.drop(null)
    }

  ngOnInit(): void {
    
    this.loadComponent();
  }

  loadComponent() {
    //console.log("loading directive", this._template);

    const componentType:Type<any> = this.templateService.getType()

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.viewReference.viewContainerRef

    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

    (<TemplateInput>componentRef.instance).setTemplateData(this.template);

    
  }

  setTemplateData(template) {
    //console.log('setTemplateData', template)
    this.template = template;
  }

  protected drop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    this.onDrop.emit(event)
  }

  protected entered(event: CdkDragEnter<any>) {
    console.log('enter', event)
    this.onEnter.emit(event)
  }

}