import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateDirective } from './template.directive';
import { TemplateService } from './template.service';
import { TemplateFullpageComponent } from './components/template-fullpage/template-fullpage.component';

@NgModule({
  declarations: [
    TemplateDirective, TemplateFullpageComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [TemplateService],
  entryComponents: [ TemplateFullpageComponent ],
  exports: [ TemplateDirective]
})
export class TemplatesModule { }
