import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherComponent } from './sketcher.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [SketcherComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [],
  exports: [SketcherComponent]
})
export class SketcherModule {}
