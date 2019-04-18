import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherComponent } from './sketcher.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ImageDropContainerComponent } from './image-drop-container/image-drop-container.component';

@NgModule({
  declarations: [SketcherComponent, ImageDropContainerComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [],
  exports: [SketcherComponent]
})
export class SketcherModule {}
