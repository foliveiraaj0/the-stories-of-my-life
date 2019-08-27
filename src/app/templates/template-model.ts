export class TemplateData {
  constructor(
    public id: string,
    public name: TemplateName,
    public templateItems: TemplateItem[]
  ) {}
}

export enum TemplateName {
  OLITR = "OLITR", //one left image text right
  ORITL = "ORITL", //one right image text left
  TILTR = "TILTR", //two images left text right
  TIRTL = "TIRTL", //two images right text left
  TWOI = "TWOI", //two images
  THREEI = "THREEI", //three images
  FOURI = "FOURI", //four images
  SIXI = "SIXI", //six images
  EIGHTI = "EIGHTI" //eight images
}

export class TemplateItem {
  constructor(public id: string) {}
}

export class TemplateImageItem extends TemplateItem {
  constructor(public id: string, public src: string, public alt: string) {
    super(id);
  }
}

export class TemplateTextItem extends TemplateItem {
  constructor(public id: string, public text: string) {
    super(id);
  }
}
