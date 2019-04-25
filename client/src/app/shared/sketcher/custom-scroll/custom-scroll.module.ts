import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomScrollComponent } from './custom-scroll.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [CustomScrollComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [],
  exports: [CustomScrollComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomScrollComponentModule {}
