import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateOLITRComponent } from './template-OLITR.ts/template-OLITR.component';
import { TemplateDirective } from './template.directive';
import { TemplateService } from './template.service';

@NgModule({
  declarations: [
    TemplateDirective, TemplateOLITRComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [TemplateService],
  entryComponents: [ TemplateOLITRComponent ],
  exports: [ TemplateDirective]
})
export class TemplatesModule { }
