import { Injectable, Type, Component } from "@angular/core";
import { TemplateFullpageComponent } from "./components/template-fullpage/template-fullpage.component";

@Injectable()
export class TemplateService {
  getType(): Type<any> {
    let templateComponentType: Type<any> = null;
    /* switch (templateName) {
      default:
        break;
    } */
    templateComponentType = TemplateFullpageComponent; //TODO create an empty template
    return templateComponentType;
  }
}
