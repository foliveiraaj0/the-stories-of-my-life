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
import { TemplateOutputInterface } from './template-output.interface';
import { TemplateInterface } from './template-interface';
import { TemplateService } from './template.service';
import { TemplateContainerInterface } from './template-container.interface';
@Directive({
  selector: "[templateDirective]"
})
export class TemplateDirective implements OnInit, TemplateOutputInterface{
  
  @Input() templateContainer: TemplateContainerInterface;
  @Input() template;

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
    //console.log("loading directive", this._template);

    const template1Component:Type<any> = this.templateService.getType()

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(template1Component);

    this.viewContainerRef.clear();

    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    console.log('load component', this.template);

    (<TemplateInterface>componentRef.instance).setTemplateData(this.template);
    (<TemplateInterface>componentRef.instance).setOutputInterfce(this);
    (<TemplateInterface>componentRef.instance).setTemplateContainer(this.templateContainer);
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
