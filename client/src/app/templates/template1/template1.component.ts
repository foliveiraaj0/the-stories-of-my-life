import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { TemplateService } from '../template/template.service';
/* import {
  CdkDragDrop,
  CdkDragEnter
} from "@angular/cdk/drag-drop"; */

@Component({
  selector: "app-template1",
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.scss"]
})
export class Template1Component extends TemplateComponent implements OnInit {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected templateService: TemplateService) {
    super(componentFactoryResolver, templateService)
  }
  
  ngOnInit() {
    
  }


 /*  getImgId() {
    return this.template && this.template.img1 ? this.template.img1.id : ""
  }

  getImgId2() {
    return this.template && this.template.img2 ? this.template.img2.id : ""
  }

  getImgSrc() {
    return this.template && this.template.img1 ? this.template.img1.src : ""
  }

  getImgAlt() {
    return this.template && this.template.img1 ? this.template.img1.alt : ""
  } */

  
}