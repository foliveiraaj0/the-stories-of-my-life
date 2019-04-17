export class TemplateSchemaData {}

export class OneImageData extends TemplateSchemaData {
  constructor(public img: { src: string; alt: string }, public text: string) {
    super();
  }
}

export class TwoImageData extends TemplateSchemaData {
  constructor(public text: string, public img: { src: string; alt: string }) {
    super();
  }
}

/* export abstract class TemplateSchema {
  abstract setData(position: number, data: TemplateSchemaData);
  abstract getData(): TemplateSchemaData;
}

export class OneImageSchema extends TemplateSchema {
  public static readonly IMG_LEFT = 0;
  public static readonly TEXT_RIGHT = 1;

  constructor(public data: OneImageData) {
    super();
  }

  setData(position: number, data: OneImageData) {
    switch (position) {
      case OneImageSchema.IMG_LEFT:
        {
          if (this.data) {
            if (data && data.img) {
              this.data.img.src = data.img.src
                ? data.img.src
                : this.data.img.src;
              this.data.img.alt = data.img.alt
                ? data.img.alt
                : this.data.img.alt;
            }
          } else {
            this.data = data;
          }
        }
        break;
      case OneImageSchema.TEXT_RIGHT: {
        if (this.data) {
          if (data) {
            this.data.text = data.text ? data.text : this.data.text;
          }
        } else {
          this.data = data;
        }
      }
    }
  }

  getData(): TemplateSchemaData {
    return this.data;
  }
}

export class TwoImageSchema extends TemplateSchema {
  constructor(public data: TwoImageData) {
    super();
  }

  setData(position: number, data: any) {}

  getData(): TemplateSchemaData {
    return this.data;
  }
}
 */