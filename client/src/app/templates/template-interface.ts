import { TemplateOutputInterface } from './template-output.interface';
import { TemplateContainerInterface } from './template-container.interface';

export interface TemplateInterface {
  setTemplateData(templateDate);
  setOutputInterfce(outputInterface: TemplateOutputInterface)
  setTemplateContainer(containerInterface: TemplateContainerInterface)
  setComponentData(data, componentId)
}