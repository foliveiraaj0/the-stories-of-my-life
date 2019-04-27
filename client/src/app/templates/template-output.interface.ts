import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';

export interface TemplateOutputInterface {
  emitDrop(event: CdkDragDrop<any>);
  emitEnter(event: CdkDragEnter<any>)
}