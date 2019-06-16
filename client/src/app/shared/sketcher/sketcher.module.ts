import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SketcherComponent } from "./sketcher.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TemplatesModule } from "src/app/templates/templates.module";

@NgModule({
  declarations: [SketcherComponent],
  imports: [CommonModule, DragDropModule, TemplatesModule],
  providers: [],
  exports: [SketcherComponent]
})
export class SketcherModule {}
