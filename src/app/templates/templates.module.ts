import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TemplateOLITRComponent } from './components/template-OLITR/template-OLITR.component';
import { TemplateDirective } from './template.directive';
import { TemplateService } from './template.service';
import { TemplateFullpageComponent } from './components/template-fullpage/template-fullpage.component';

@NgModule({
  declarations: [
    TemplateDirective, TemplateOLITRComponent, TemplateFullpageComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [TemplateService],
  entryComponents: [ TemplateOLITRComponent, TemplateFullpageComponent ],
  exports: [ TemplateDirective]
})
export class TemplatesModule { }
