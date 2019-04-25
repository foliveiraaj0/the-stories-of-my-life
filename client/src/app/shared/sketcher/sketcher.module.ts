import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherComponent } from './sketcher.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CustomScrollComponentModule } from './custom-scroll/custom-scroll.module';

@NgModule({
  declarations: [SketcherComponent],
  imports: [
    CommonModule,
    DragDropModule,
    CustomScrollComponentModule
  ],
  providers: [],
  exports: [SketcherComponent]
})
export class SketcherModule {}
