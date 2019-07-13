import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';

export interface TemplateContainerInterface {
  droppedInsideThisCompnent(): boolean
}