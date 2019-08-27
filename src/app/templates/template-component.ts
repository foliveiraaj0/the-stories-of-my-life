import { TemplateData, TemplateImageItem } from './template-model';
import { TemplateOutputInterface } from './interfaces/template-output.interface';
import { TemplateContainerInterface } from './interfaces/template-container.interface';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { TemplateInterface } from './interfaces/template-interface';

export abstract class TemplateComponent implements TemplateInterface{

  protected templateData: TemplateData;
  protected outputInterface:TemplateOutputInterface
  protected containerInterface: TemplateContainerInterface;

  protected abstract createTemplateItems();
  protected abstract setComponentData(data, componentId);

  private getConnections(): string[] {
    let connections: string[] = []
    this.templateData.templateItems.forEach(item => {
      if(item instanceof TemplateImageItem) {
        connections.push(item.id);
      }
    });
    return connections;
  }

  setOutputInterfce(outputInterface) {
    this.outputInterface = outputInterface;
  }

  setTemplateData(template:TemplateData) {
    console.log('setTemplateData', template)
    this.templateData = template;
    this.createTemplateItems();
    if(this.outputInterface) {
      const connections:string[] = this.getConnections();
      this.outputInterface.emitConnections(connections);
    }
  }

  setTemplateContainer(containerInterface: TemplateContainerInterface) {
    this.containerInterface = containerInterface;
  }

  drop(event: CdkDragDrop<any>) {
    console.log('drop', event)
    this.dropImage(event)
    if(this.outputInterface) {
      this.outputInterface.emitDrop(event)
    }
  }

  entered(event: CdkDragEnter<any>) {
    console.log('enter', event)
    if(this.outputInterface) {
      this.outputInterface.emitEnter(event)
    }
  }

  dropImage(event: CdkDragDrop<any>) {
    console.log("dropImage", event);
    if (this.containerInterface && this.containerInterface.droppedInsideThisCompnent()) {
      //using copyArrayItem in this scenary will add a new item to contentList instead of
      //just changing the contents of the item inside of it
      this.setComponentData(event.previousContainer.data[event.previousIndex], event.container.id);
    }
  }

}