import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherComponent } from './sketcher.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CustomScrollModule } from '../custom-scroll/custom-scroll.module';
import { ViewReference } from './view-reference.directive';

@NgModule({
  declarations: [SketcherComponent, ViewReference],
  imports: [
    CommonModule,
    DragDropModule,
    CustomScrollModule
  ],
  providers: [],
  exports: [SketcherComponent]
})
export class SketcherModule {}
