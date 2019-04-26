import {
  Directive,
  ViewContainerRef
} from "@angular/core";
@Directive({
  selector: "[viewReference]"
})
export class ViewReference {
  
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {}
  
}
