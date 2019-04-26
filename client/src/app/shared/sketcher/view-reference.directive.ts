import {
  Directive,
  ViewContainerRef,
  OnInit,
  Input,
  ComponentFactoryResolver,
  Type
} from "@angular/core";
import { TemplateInput } from '../../templates/template-interface';
import { Template1Component } from '../../templates/template1.component';

@Directive({
  selector: "[viewReference]"
})
export class ViewReference implements OnInit {
  private _template;
  @Input()
  set template(template) {
    this._template = template;
    console.log("new template", this._template);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    console.log("loading directive", this._template);

    const componentType:Type<any> = Template1Component

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.viewContainerRef.clear();

    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    (<TemplateInput>componentRef.instance).setTemplateData(this._template);
  }
}
