import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Template1Component } from './template1.component';
import { ViewReference } from './template-view-container.directive';

@NgModule({
  declarations: [
    Template1Component, ViewReference
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  entryComponents: [ Template1Component ],
  exports: [Template1Component, ViewReference]
})
export class TemplatesModule { }
