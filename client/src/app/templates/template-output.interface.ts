import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';

export interface TemplateOutputInterface {
  emitConnections(event:any);
  emitDrop(event: CdkDragDrop<any>);
  emitEnter(event: CdkDragEnter<any>)
}