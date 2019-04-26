import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Template1Component } from './template1/template1.component';
import { ViewReference } from './template-view-container.directive';
import { TemplateComponent } from './template/template.component';
import { TemplateService } from './template/template.service';

@NgModule({
  declarations: [
    TemplateComponent, Template1Component, ViewReference
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [TemplateService],
  entryComponents: [ Template1Component ],
  exports: [ TemplateComponent, Template1Component, ViewReference]
})
export class TemplatesModule { }
