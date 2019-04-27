import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Template1Component } from './template1/template1.component';
import { TemplateDirective } from './template.directive';
import { TemplateService } from './template.service';

@NgModule({
  declarations: [
    TemplateDirective, Template1Component
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [TemplateService],
  entryComponents: [ Template1Component ],
  exports: [ TemplateDirective]
})
export class TemplatesModule { }
