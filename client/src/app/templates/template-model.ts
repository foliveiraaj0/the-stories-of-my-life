export class TemplateData {
  constructor(public id:string, public name:TemplateName, public templateItems: TemplateItem[]){}
}

export enum TemplateName {
  OLITR, ORITL, TILTR, TIRTL, TWOI, THREEI, FOURI, SIXI, EIGHTI
}

export class TemplateItem {
  constructor(public id: string){}
}

export class TemplateImage extends TemplateItem {
  constructor(public id:string, public src: string, public alt:string){
    super(id);
  }
}

export class TemplateText extends TemplateItem {
  constructor(public id: string, public text: string) {
    super(id);
  }
}