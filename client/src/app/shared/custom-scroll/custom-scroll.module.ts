import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CustomScrollComponent } from './custom-scroll.component';

@NgModule({
  declarations: [CustomScrollComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  providers: [],
  exports: [CustomScrollComponent]
})
export class CustomScrollModule {}
