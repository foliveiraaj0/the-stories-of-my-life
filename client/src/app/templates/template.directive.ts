import {
  Directive,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  Type,
  OnInit
} from "@angular/core";
import { CdkDragDrop, CdkDragEnter } from "@angular/cdk/drag-drop";
import { TemplateOutputInterface } from './interfaces/template-output.interface';
import { TemplateInterface } from './interfaces/template-interface';
import { TemplateService } from './template.service';
import { TemplateContainerInterface } from './interfaces/template-container.interface';
import { TemplateData } from './template-model';
import { TemplatePresentation } from '../models/template-presentation';
@Directive({
  selector: "[templateDirective]"
})
export class TemplateDirective implements OnInit, TemplateOutputInterface{
  
  @Input() templateContainer: TemplateContainerInterface;
  @Input() template: TemplatePresentation;
  @Input() index;

  @Output() onConnections: EventEmitter<any> = new EventEmitter();
  @Output() onDrop: EventEmitter<CdkDragDrop<any>> = new EventEmitter();
  @Output() onEnter: EventEmitter<CdkDragEnter<any>> = new EventEmitter();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private templateService:TemplateService
  ) {}

  ngOnInit(): void {
    this.loadComponent()
  }

  loadComponent() {
    console.log("loading directive", this.template);

    const template1Component:Type<any> = this.templateService.getType(this.template.name)

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(template1Component);

    this.viewContainerRef.clear();

    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    let templateData:TemplateData = new TemplateData(`${this.template.name}-${this.index}`
      ,this.template.name, []);    

    (<TemplateInterface>componentRef.instance).setOutputInterfce(this);
    (<TemplateInterface>componentRef.instance).setTemplateContainer(this.templateContainer);
    (<TemplateInterface>componentRef.instance).setTemplateData(templateData);
  }

  emitConnections(event: any) {
    console.log('connections', event)
    this.onConnections.emit(event)
  }

  emitDrop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    this.onDrop.emit(event)
  }

  emitEnter(event: CdkDragEnter<any>) {
    console.log('enter', event)
    this.onEnter.emit(event)
  }
  
}
